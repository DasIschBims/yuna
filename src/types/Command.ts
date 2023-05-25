import {
    ApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
} from "discord.js";
import {ExtendedClient} from "../structs/Client";

interface CommandProps {
    client: ExtendedClient,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
}

export type CommandType = ApplicationCommandData & {
    run(props: CommandProps): any;
}

export class Command {
    constructor(options: CommandType){
        options.dmPermission = options.dmPermission ?? false;
        Object.assign(this, options);
    }
}