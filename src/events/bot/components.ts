import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";
import {client} from "../../index";
import {CommandInteractionOptionResolver} from "discord.js";

export default new Event({
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
            Logger.logInfo(`Running context menu command ${interaction.commandName}`, "ContextMenu");
        } else if (interaction.isCommand()) {
            Logger.logInfo(`Running command ${interaction.commandName}`, "Command");

            if (!interaction.isCommand()) return;

            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            const options = interaction.options as CommandInteractionOptionResolver;

            command.run({ client, interaction, options });
        } else if (interaction.isModalSubmit()) {
            Logger.logInfo(`Running modal submit command ${interaction.customId}`, "ModalSubmit");
        } else if (interaction.isButton()) {
            Logger.logInfo(`Running button command ${interaction.customId}`, "Button");

            await interaction.reply({
                content: `You clicked button "${interaction.customId}"!`,
                ephemeral: true
            });
        }
    },
});