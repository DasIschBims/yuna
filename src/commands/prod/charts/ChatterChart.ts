import {ApplicationCommandType, ColorResolvable, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {getRandomColor} from "../../../utils/colors/BrandColor";
import {chatterChart} from "../../../utils/stats/ChatterChart";

export default new Command({
    name: "chatters",
    description: "Draw a chart of the top chatters in the server.",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async ({ interaction }) => {
        const chart = await chatterChart(interaction.guild);

        if (chart.error || !chart) {
            return await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(getRandomColor())
                        .setTimestamp()
                        .setTitle("Error")
                        .setDescription("An error occurred while fetching the chart.")
                ]
            });
        }

        return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor(chart.color as ColorResolvable)
                    .setTimestamp()
                    .setTitle("Top chatters for " + interaction.guild?.name + " 📈")
                    .setImage("attachment://" + chart.fileName)
                    .setDescription("Chart only displays messages after the bot was added.")
            ],
            files: [
                {
                    name: chart.fileName ?? "chart.png",
                    attachment: chart.img ?? Buffer.from(chart.img ?? "")
                }
            ]
        });
    }
});