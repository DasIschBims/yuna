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