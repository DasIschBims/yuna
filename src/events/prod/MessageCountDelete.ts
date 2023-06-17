import {Event} from "../../types/Event";
import {upsertUser} from "../../utils/user/UpsertUser";
import {prisma} from "../../utils/db/Prisma";
import {Logger} from "../../utils/logging/Logger";

export default new Event({
    name: "messageDelete",
    once: true,
    run: async function (message) {
        const guildId = message.guild.id;
        const userId = message.author.id;

        try {
            await upsertUser(message.member);

            await prisma.userGuild.update({
                where: {
                    user_guild: {
                        guildId: guildId,
                        userId: userId
                    }
                },
                data: {
                    messageCount: {
                        decrement: 1
                    }
                }
            });
        } catch (error) {
            Logger.logError(error, "MessageCount");
        }
    }
});