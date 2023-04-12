import {ExtendedClient} from "./structs/client"
import {Logger} from "./utils/logging/logger";
import {setBotActivity} from "./utils/activity/setBotActivity";
import {ActivityType} from "discord-api-types/v10";

require("dotenv").config();

export const client = new ExtendedClient();

try {
     client.start().then(() => {
         setBotActivity({text: "the source code.", type: ActivityType.Watching, status: "online"})
     });
} catch (e) {
    Logger.logError(`${e}`, "Startup")
}