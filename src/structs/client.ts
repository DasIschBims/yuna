import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    Partials
} from "discord.js";
import {Logger} from "../utils/logging/logger";
import {CommandType, ComponentsButton, ComponentsModal, ComponentsSelect} from "../types/command";
import {EventType} from "../types/event";
import * as fs from "fs";
import path from "path";
import mysql from 'mysql';

const fileCondition = (fileName: string) => fileName.endsWith(".ts");

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();
    public events: Collection<string, EventType<keyof ClientEvents>> = new Collection();
    public db: any;

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
            partials: [Partials.Message, Partials.User, Partials.GuildMember]
        });
    }

    public async start() {
        try {
            console.clear();
            await Logger.printLogo();
            if (!process.env.discordToken) {
                Logger.logError("No bot token provided (make sure to setup the .env file)", "Startup");
                return;
            }
            await this.connectDB();
            this.registerModules();
            this.registerEvents();
            await this.login(process.env.discordToken);
        } catch (error) {
            Logger.logError(error, "Startup");
            process.exit(1);
        }
    }

    private async registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        try {
            await this.application?.commands.set(commands);
        } catch (error) {
            Logger.logError(`An error occurred while trying to register the slash commands: \n${error}`, "Slash Commands");
        }
    }

    private registerModules(){
        const slashCommands: Array<ApplicationCommandDataResolvable> = [];

        const commandsPath = path.join(__dirname, "..", "commands");

        fs.readdirSync(commandsPath).forEach(local => {

            fs.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async fileName => {

                const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
                const { name, buttons, selects, modals } = command;

                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);

                    if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects) selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals) modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });

        this.on("ready", () => this.registerCommands(slashCommands));
    }
    private registerEvents(){
        const eventsPath = path.join(__dirname, "..", "events");

        fs.readdirSync(eventsPath).forEach(local => {
            fs.readdirSync(path.join(__dirname, "..", "events", local)).filter(fileCondition)
                .forEach(async fileName => {
                    const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))?.default as EventType<keyof ClientEvents>;
                    if (!name || !run) return;

                    try {
                        if (name) (once) ? this.once(name, run) : this.on(name, run);
                        this.events.set(name, { name, once, run });
                    } catch (error) {
                        Logger.logError(`An error occurred while trying to register the event ${name}: \n${error}`, "Events");
                    }
                });
        });

        if (process.env.enableDalai) {
            const dalaiPath = path.join(__dirname, "..", "ai");

            fs.readdirSync(dalaiPath).filter(fileCondition).forEach(async fileName => {
                const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../ai/${fileName}`))?.default as EventType<keyof ClientEvents>;
                if (!name || !run) return;

                try {
                    if (name) (once) ? this.once(name, run) : this.on(name, run);
                    this.events.set(name, { name, once, run });
                } catch (error) {
                    Logger.logError(`An error occurred while trying to register the event ${name}: \n${error}`, "Events");
                }
            });
        }
    }

    private connectDB() {
        if (!process.env.dbHost || !process.env.dbUser || !process.env.dbPassword || !process.env.dbName) {
            Logger.logError("Some database credentials are missing (make sure to setup the .env file)", "MariaDB");
            process.exit(1);
        }

        try {
            const connection = mysql.createConnection({
                host: process.env.dbHost,
                user: process.env.dbUser,
                password: process.env.dbPassword,
                database: process.env.dbName
            });

            connection.connect((err) => {
                if (err) {
                    Logger.logError(`Error connecting to MariaDB database: ${err}`, "MariaDB");
                    return;
                }

                Logger.logInfo(`Successfully connected to MariaDB database!`, "MariaDB");
                this.db = connection;
            });
        } catch (error) {
            Logger.logError(`An error occurred while trying to connect to the MariaDB database: \n${error}`, "MariaDB");
            process.exit(1);
        }
    }
}