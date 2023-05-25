import {Event} from "../../types/Event";
import {Logger} from "../../utils/logging/Logger";
import {EmbedBuilder} from "discord.js";
import {getRandomColor} from "../../utils/colors/BrandColor";

export default new Event({
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isButton()) return;

        Logger.debug("Button interaction received " + interaction.customId, "ButtonListener");

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Debug Button")
                    .addFields(
                        {
                            name: "Interaction",
                            // build own json since the interaction object is too big
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
                                message: {
                                    id: interaction.message.id,
                                    content: interaction.message.content,
                                },
                            }, null, 2) + "```"
                        }
                    ),
            ],
            ephemeral: true
        });
    },
});