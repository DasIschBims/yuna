import {Event} from "../../types/Event";
import {Logger} from "../../utils/logging/Logger";
import {EmbedBuilder} from "discord.js";
import {getRandomColor} from "../../utils/colors/BrandColor";

export default new Event({
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isModalSubmit()) return;

        Logger.debug("Modal submit interaction received: " + interaction.customId, "ModalListener");

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Debug Button")
                    .addFields(
                        {
                            name: "Interaction",
                            value: "```json\n" + JSON.stringify({
                                id: interaction.id,
                                customId: interaction.customId,
                                type: interaction.type,
                                version: interaction.version,
                                user: {
                                    id: interaction.user.id,
                                    username: interaction.user.username,
                                    discriminator: interaction.user.discriminator,
                                },
                                guild: {
                                    id: interaction.guild.id,
                                    name: interaction.guild.name,
                                    preferredLocale: interaction.guild.preferredLocale,
                                },
                                channel: {
                                    id: interaction.channel.id,
                                    name: interaction.channel.name,
                                },
                                inputValues: interaction.fields.fields,

                            }, null, 2) + "```"
                        }
                    ),
            ],
            ephemeral: true
        });
    },
});