import {ActionRowBuilder, Collection, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

const debugModals = new Collection<string, ModalBuilder>();

debugModals.set("debug-short",
    new ModalBuilder()
        .setCustomId("debug-short-modal")
        .setTitle("Debug Short")
        .addComponents(
            new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                    .setValue("Hello World!")
                    .setCustomId("debug-short-text")
                    .setLabel("Debug Short")
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(25)
            ),
        )
);

debugModals.set("debug-paragraph",
    new ModalBuilder()
        .setCustomId("debug-paragraph-modal")
        .setTitle("Debug Paragraph")
        .addComponents(
            new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                    .setValue("Hello World!")
                    .setCustomId("debug-paragraph-text")
                    .setLabel("Debug Paragraph")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMaxLength(100)
            ),
        )
);

export default debugModals;