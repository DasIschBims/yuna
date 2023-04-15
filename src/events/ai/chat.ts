import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";

export default new Event({
    name: "messageCreate",
    once: true,
    async run(interaction) {
        if (!interaction.content.startsWith(`<@${process.env.clientId}>`)) return;
        const content = interaction.content.replace(`<@${process.env.clientId}>`, "").trim();
        if (content === "") return;

        try {
            const reply = "AI responses currently not working."; // await askGPT(content);
            interaction.reply(reply);
        } catch (error) {
            Logger.logError(error, "chat");
        }
    },
});