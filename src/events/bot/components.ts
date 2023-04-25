import {Event} from "../../types/event";
import {client} from "../../index";

export default new Event({
    name: "interactionCreate",
    once: false,
    run(interaction) {
        if (interaction.isModalSubmit()) {
            client.modals.get(interaction.customId)?.(interaction);
        } else if (interaction.isButton()) {
            client.buttons.get(interaction.customId)?.(interaction);
        } else if (interaction.isStringSelectMenu()) {
            client.selects.get(interaction.customId)?.(interaction);
        }
    },
});