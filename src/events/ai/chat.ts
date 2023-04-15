import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";
import axios from "axios";

export default new Event({
    name: "messageCreate",
    async run(interaction) {
        if (!interaction.content.startsWith(`<@${process.env.clientId}>`) || interaction.author.bot) return;
        const content = interaction.content.replace(`<@${process.env.clientId}>`, "").trim();
        if (content === "") return;

        // const API = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
        let reply = "";

        // const payload = {
        //             inputs: {
        //                 text: content,
        //             }
        //         }
        //
        //         const headers = {
        //             'Authorization': `Bearer ${process.env.huggingFaceKey}`,
        //         }

        try {
            await interaction.channel.sendTyping();

            // const response = await axios.post(API, JSON.stringify(payload), { headers });
            //             const data = await response.data;
            //
            //             Logger.logInfo(`Chat request: ${content}`, "Chat Content");
            //             Logger.logInfo(`Chat response: ${JSON.stringify(data)}`, "Chat Data");
            //
            //             if (data?.generated_text) {
            //                 reply = data.generated_text;
            //             } else {
            //                 reply = "I'm sorry, I don't know how to respond to that.";
            //             }
            //
            //             Logger.logInfo(`Chat reply: ${reply}`, "Chat Reply");
        } catch (error) {
            // if (error.response.data.error.endsWith("is currently loading")) {
            //                 reply = "I'm sorry, I'm still loading, estimated time: " + error.response.data.estimated_time.toFixed(0) + " seconds";
            //                 Logger.logError(`${error.response.data.error}`, "Chat Error");
            //             } else {
            //                 reply = "I'm sorry, I don't know how to respond to that.";
            //                 Logger.logError(`Chat error: ${error}`, "Chat Error");
            //             }
        }

        return await interaction.reply(reply);
    },
});