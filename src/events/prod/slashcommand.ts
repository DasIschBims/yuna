import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";
import {client} from "../../index";
import {CommandInteractionOptionResolver} from "discord.js";

export default new Event({
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isCommand()) return;

        try {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            const options = interaction.options as CommandInteractionOptionResolver;

            command.run({ client, interaction, options });
        } catch (error) {
            Logger.logError(`An error occurred while trying to run command ${interaction.commandName}: \n${error}`, "Command");
        }
    },
});