import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";
import {prisma} from "../../utils/db/prisma";
import {getNextLevelGoal} from "../../utils/level/getNextLevelGoal";
import {upsertUser} from "../../utils/user/upsertUser";
import {getRandomColor} from "../../utils/colors/brandColors";
import {EmbedBuilder} from "discord.js";

export default new Event({
    name: "messageCreate",
    once: false,
    run: async function (message) {
        if (message.author.bot) return;

        try {
            await upsertUser(message.member);

            const userData = await prisma.userGuild.findUnique({
                where: {
                    user_guild: {
                        guildId: message.guild.id,
                        userId: message.author.id
                    }
                }
            });

            const xp = Math.floor(Math.random() * 11) + 10;
            const levelGoal = getNextLevelGoal(userData.xp);

            if (userData.xp >= levelGoal) {
                await prisma.userGuild.update({
                    where: {
                        user_guild: {
                            guildId: message.guild.id,
                            userId: message.author.id
                        }
                    },
                    data: {
                        xp: userData.xp + xp - levelGoal,
                        level: userData.level + 1
                    }
                });

                await message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(getRandomColor())
                            .setTimestamp()
                            .setTitle("Level Up!")
                            .setDescription(
                                `You are now level **${userData.level + 1}**!\n` +
                                `You need **${getNextLevelGoal(userData.xp + xp - levelGoal)}** xp to reach level **${userData.level + 2}**!`
                            )
                    ]
                })
            } else {
                await prisma.userGuild.update({
                    where: {
                        user_guild: {
                            guildId: message.guild.id,
                            userId: message.author.id
                        }
                    },
                    data: {
                        xp: userData.xp + xp
                    }
                });
            }
        } catch (error) {
            Logger.logError(`${error}`, "Level System");
        }
    },
});
