import {ChatMessage} from "chatgpt";
import {client} from "../../index";
import {Logger} from "../logging/logger";
export const askGPT = async (userPrompt: string) => {
    let res: ChatMessage | null = null;
    const gpt = await client.gpt;

    try {
        res = await gpt.sendMessage(userPrompt as string, {
            systemMessage: client.basePrompt,
        });

        return res.text;
    } catch (error) {
        Logger.logError(error, "askGPT");
    }
};