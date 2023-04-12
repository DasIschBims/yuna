import {ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits, Partials} from "discord.js";
import {CommandType} from "./typings/Command";
import {Logger} from "./utils/logging/Logger";
import {RegisterCommandsOptions} from "./typings/Client";
import path from "path";
import {glob} from "glob";
import {promisify} from "util";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages], partials: [Partials.Message, Partials.User, Partials.GuildMember] });
    }

    async start() {
        try {
            console.clear();
            await Logger.printLogo();
            if (!process.env.discordToken) {
                Logger.logError("No bot token provided (make sure to setup the .env file)", "Startup");
                return;
            }
            await this.registerModules();
            await this.login(process.env.discordToken);
        } catch (error) {
            console.error('Error starting bot:', error);
        }
    }

    async registerCommands({ commands }: RegisterCommandsOptions) {
        await this.application?.commands.set(commands);
    }

    async registerModules() {
        const commands = await globPromise(`${process.cwd()}/src/commands/**/*.ts`);
        for (const command of commands) {
            const { default: Command } = await import(command);
            this.commands.set(Command.name, Command);
            Logger.log(`Loaded command ${Command.name}`, "Commands");
        }

        const events = await globPromise(`${process.cwd()}/src/events/*.ts`);
        for (const event of events) {
            const { default: Event } = await import(event);
            this.on(Event.name, Event.run.bind(null, this));
            Logger.log(`Loaded event ${Event.event}`, "Events");
        }

        await this.registerCommands({ commands: this.commands.map((command) => command as ApplicationCommandDataResolvable) });
    }
}