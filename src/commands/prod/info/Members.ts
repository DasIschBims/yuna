import {ApplicationCommandType, ColorResolvable, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {getRandomColor} from "../../../utils/colors/BrandColor";
import {memberChart} from "../../../utils/stats/MemberChart";

export default new Command({
    name: "members",
    description: "Draw a member count graph",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async ({ interaction }) => {
        const chart = await memberChart(interaction.guild);

        if (chart.error) {
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

        const thirtyDaysPercent = (chart.thirtyDaysCount! * 100) / memberCount;
        const sevenDaysPercent = (chart.sevenDaysCount! * 100) / memberCount;
        const oneDayPercent = (chart.oneDayCount! * 100) / memberCount;

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(chart.color as ColorResolvable)
                    .setTimestamp()
                    .setTitle("Member count for " + interaction.guild?.name + " 📈")
                    .addFields([
                        {
                            name: "Server members",
                            value: "Users: ``" + memberCount + "``\n" +
                                   "Bots: ``" + botCount + "``"
                        },
                        {
                            name: "Growth over time",
                            value: "**Last month:**\n``" + (chart.thirtyDaysCount!<0?'':'+') + chart.thirtyDaysCount + "`` members ``(" + (thirtyDaysPercent!<0?'':'+') + thirtyDaysPercent.toFixed(2) + "%)``\n" +
                                   "**Last week:**\n``" + (chart.sevenDaysCount!<0?'':'+') + chart.sevenDaysCount + "`` members ``(" + (sevenDaysPercent!<0?'':'+') + sevenDaysPercent.toFixed(2) + "%)``\n" +
                                   "**Last day:**\n``" + (chart.oneDayCount!<0?'':'+') + chart.oneDayCount + "`` members ``(" + (oneDayPercent!<0?'':'+') + oneDayPercent.toFixed(2) + "%)``"
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