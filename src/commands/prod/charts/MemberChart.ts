import {ApplicationCommandType, ColorResolvable, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {getRandomColor} from "../../../utils/colors/BrandColor";
import {memberChart} from "../../../utils/stats/MemberChart";

export default new Command({
    name: "members",
    description: "Draw a chart of the member count over time",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async ({ interaction }) => {
        const chart = await memberChart(interaction.guild);

        if (chart.error || !chart) {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(getRandomColor())
                        .setTimestamp()
                        .setTitle("Error")
                        .setDescription("An error occurred while fetching the member count graph")
                ]
            });
        }

        const count = interaction.guild?.memberCount;
        const memberCount = interaction.guild?.members.cache.filter((member) => !member.user.bot).size;
        const botCount = count - memberCount;

        const thirtyDaysCount = chart.thirtyDaysCount;
        const sevenDaysCount = chart.sevenDaysCount;
        const oneDayCount = chart.oneDayCount;

        const thirtyDaysPercent = (thirtyDaysCount / memberCount) * 100;
        const sevenDaysPercent = (sevenDaysCount / memberCount) * 100;
        const oneDayPercent = (oneDayCount / memberCount) * 100;

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(chart.color as ColorResolvable)
                    .setTimestamp()
                    .setTitle("Member count for " + interaction.guild?.name + " 📈")
                    .addFields([
                        {
                            name: "Current members",
                            value: "Users: ``" + memberCount.toLocaleString() + "``\n" +
                                   "Bots: ``" + botCount.toLocaleString() + "``"
                        },
                        {
                            name: "Growth over time",
                            value:
                                "Last month: ``" + (thirtyDaysCount > 0 ? "+" : "") + thirtyDaysCount.toLocaleString() + " members ("+ (thirtyDaysCount > 0 ? "+" : "") + thirtyDaysPercent.toFixed(2) + "%)``\n" +
                                "Last week: ``" + (sevenDaysCount > 0 ? "+" : "") + sevenDaysCount.toLocaleString() + " members ("+ (sevenDaysCount > 0 ? "+" : "") + sevenDaysPercent.toFixed(2) + "%)``\n" +
                                "Last day: ``" + (oneDayCount > 0 ? "+" : "") + oneDayCount.toLocaleString() + " members ("+ (oneDayCount > 0 ? "+" : "") + oneDayPercent.toFixed(2) + "%)``"
                        }
                    ])
                    .setImage("attachment://" + chart.fileName)
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