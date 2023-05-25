import {ActionRowBuilder, ApplicationCommandType, ButtonBuilder, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {prisma} from "../../../utils/db/Prisma";
import {getRandomColor} from "../../../utils/colors/BrandColor";
import {upsertUser} from "../../../utils/user/UpsertUser";
import {getNextLevelGoal} from "../../../utils/level/GetNextLevelGoal";
import {debugDanger, debugPrimary, debugSecondary, debugSuccess} from "../../../components/buttons/DebugButtons";

export default new Command({
    name: "debug-all",
    description: "Developer command",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async ({ interaction }) => {
        await interaction.deferReply();

        await upsertUser(interaction.guild.members.cache.get(interaction.user.id));

        const userGuildEntries = await prisma.userGuild.findFirst({
            where: {
                guildId: interaction.guild.id,
                userId: interaction.user.id
            }
        });

        const guildEntries = await prisma.guild.findFirst({
            where: {
                guildId: interaction.guild.id
            }
        });

        const userEntries = await prisma.user.findFirst({
            where: {
                userId: interaction.user.id
            }
        });

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Debug Database")
                    .addFields(
                        {
                            name: "Table: UserGuild",
                            value: "```json\n" + JSON.stringify(userGuildEntries, null, 2) + "```"
                        },
                        {
                            name: "Table: Guild",
                            value: "```json\n" + JSON.stringify(guildEntries, null, 2) + "```"
                        },
                        {
                            name: "Table: User",
                            value: "```json\n" + JSON.stringify(userEntries, null, 2) + "```"
                        }
                    ),
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Debug Economy")
                    .addFields(
                        {
                            name: "Balance",
                            value: "```json\n" + JSON.stringify(userGuildEntries.balance, null, 2) + "```"
                        }
                    ),
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Debug Leveling")
                    .addFields(
                        {
                            name: "Level",
                            value: "```json\n" + JSON.stringify(userGuildEntries.level, null, 2) + "```"
                        },
                        {
                            name: "XP",
                            value: "```json\n" + JSON.stringify("Current XP: " + userGuildEntries.xp + ", XP needed for Level up: " + getNextLevelGoal(userGuildEntries.level), null, 2) + "```"
                        }
                    )
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().setComponents(
                    debugPrimary,
                    debugSecondary,
                    debugSuccess,
                    debugDanger
                )
            ]
        });
    }
});