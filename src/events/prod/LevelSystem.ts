import {Event} from "../../types/Event";
import {Logger} from "../../utils/logging/Logger";
import {prisma} from "../../utils/db/Prisma";
import {getNextLevelGoal} from "../../utils/level/GetNextLevelGoal";
import {upsertUser} from "../../utils/user/UpsertUser";
import {getRandomColor} from "../../utils/colors/BrandColor";
import {EmbedBuilder} from "discord.js";

const cooldowns = new Set();

export default new Event({
    name: "messageCreate",
    once: false,
    run: async function (message) {
        if (message.author.bot) return;
        if (cooldowns.has(message.author.id)) return;

        try {
            await upsertUser(message.member);

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);

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
                        level: {
                            increment: 1
                        }
                    }
                });

                const guildData = await prisma.guild.findUnique({
                    where: {
                        guildId: message.guild.id
                    }
                });

                if (guildData.lvlNotify) {
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
                    });
                }
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
