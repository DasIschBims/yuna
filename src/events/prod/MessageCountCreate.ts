import {Event} from "../../types/Event";
import {prisma} from "../../utils/db/Prisma";
import {upsertUser} from "../../utils/user/UpsertUser";
import {Logger} from "../../utils/logging/Logger";

export default new Event({
    name: "messageCreate",
    once: false,
    run: async function (message) {
        if (message.author.bot) return;

        try {
            await upsertUser(message.member);

            await prisma.userGuild.update({
                where: {
                    user_guild: {
                        guildId: message.guild.id,
                        userId: message.author.id
                    }
                },
                data: {
                    messageCount: {
                        increment: 1
                    }
                }
            });
        } catch (error) {
            Logger.logError(error, "MessageCount");
        }
    }
});