import {Event} from "../../types/event";
import { io } from "socket.io-client";
import {Logger} from "../../utils/logging/logger";
import {Message} from "discord.js";

const socket = io("http://127.0.0.1:3000");
socket.on("connect", () => {
    Logger.logInfo("Connected to socket.io", "Dalai");
});

export default new Event({
    name: "messageCreate",
    async run(message) {
        if (!message.content.startsWith(`<@${process.env.clientId}>`) || message.author.bot || !socket.connected) return;
        const content = message.content.replace(`<@${process.env.clientId}>`, "").trim();
        if (content === "") return;

        const prompt = `You are a discord bot called yuna, your purpose is to chat with people in the server and entertain them. Current date: ${new Date().toISOString()}.\r\nUser prompt: ${content.toString()}\r\nYuna's response: `;
        let reply = "";

        const dalaiRequest = {
            seed: -1,
            threads: 16,
            n_predict: 200,
            top_k: 40,
            top_p: 0.9,
            temp: 0.8,
            repeat_last_n: 64,
            repeat_penalty: 1.1,
            debug: false,
            models: ["alpaca.7B"],
            model: "alpaca.7B",

            prompt: prompt,
        };

        try {
            await message.channel.sendTyping();

            let botMessage: Message;
            await message.reply("**Loading...**").then((msg) => {
                botMessage = msg;
            });

            let finished = false;

            socket.emit("request", dalaiRequest).on("result", (r) => {
                reply += r.response;
                if (reply.toString().includes("<end>") && !finished) {
                    finished = true;
                    Logger.logInfo("Replied to message:\n" + content + "\nWith:\n" + reply.substring(reply.indexOf("Yuna's response: ") + 17).replace("<end>", ""), "Dalai");
                    botMessage.edit(reply.substring(reply.indexOf("Yuna's response: ") + 17).replace("<end>", ""));
                }
            });
        } catch (error) {
            Logger.logError(error, "Dalai");
        }
    },
});