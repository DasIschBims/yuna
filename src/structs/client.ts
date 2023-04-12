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
import {client} from "../index";

const fileCondition = (fileName: string) => fileName.endsWith(".ts");

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

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
            this.registerModules();
            this.registerEvents();
            await this.login(process.env.discordToken);
        } catch (error) {
            Logger.logError(error, "Startup");
            process.exit(1);
        } finally {
            Logger.logSuccess("Successfully logged in as " + client.user?.tag, "Startup");
        }
    }

    private registerCommands(commands: Array<ApplicationCommandDataResolvable>){
        this.application?.commands.set(commands)
            .then(() => {
                Logger.log(`Successfully registered ${commands.length} slash commands`, "Slash Commands");
            })
            .catch(error => {
                Logger.logError(`An error occurred while trying to register the slash commands: \n${error}`, "Slash Commands");
            })
    }
    private registerModules(){
        const slashCommands: Array<ApplicationCommandDataResolvable> = [];

        const commandsPath = path.join(__dirname, "..", "commands");

        fs.readdirSync(commandsPath).forEach(local => {

            fs.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async fileName => {

                const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
                const { name, buttons, selects, modals } = command

                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);

                    if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects) selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals) modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });

        this.on("ready", () => this.registerCommands(slashCommands))
    }
    private registerEvents(){
        const eventsPath = path.join(__dirname, "..", "events");

        fs.readdirSync(eventsPath).forEach(local => {
            let commandPath = path.join(__dirname, "..", "events", local);

            fs.readdirSync(commandPath).filter(fileCondition)
                .forEach(async fileName => {
                    const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))?.default;
                    try {
                        if (name) (once) ? this.once(name, run) : this.on(name, run);
                        Logger.log(`Successfully registered the event ${name}`, "Events");
                    } catch (error) {
                        Logger.logError(`An error occurred while trying to register the event ${name}: \n${error}`, "Events");
                    }
                })

        })
    }
}