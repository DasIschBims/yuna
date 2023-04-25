import {CommandInteractionOptionResolver} from "discord.js";
import {client} from "../../index";
import {Event} from "../../types/event";

export default new Event({
    name: "interactionCreate",
    once: false,
    run(interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const options = interaction.options as CommandInteractionOptionResolver;

        command.run({ client, interaction, options });
    },
});