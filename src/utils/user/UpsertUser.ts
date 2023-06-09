import {GuildMember, PartialGuildMember} from "discord.js";
import {prisma} from "../db/Prisma";

export const upsertUser = async (
    user: GuildMember | PartialGuildMember
) => {
    if (user.user.bot) return;

    const userId = user.user.id;
    const guildId = user.guild.id;

    const dbUser = await prisma.user.upsert({
        where: {
            userId: userId
        },
        create: {
            userId: userId,
        },
        update: {
            userId: userId,
        }
    });

    await prisma.guild.upsert({
        where: {
            guildId: guildId
        },
        create: {
            guildId: guildId,
        },
        update: {
            guildId: guildId,
        }
    });

    await prisma.userGuild.upsert({
        where: {
            user_guild: {
                guildId: guildId,
                userId: userId
            }
        },
        update: {
            guildId: guildId,
        },
        create: {
            guildId: guildId,
            userId: userId
        }
    });

    return dbUser;
};