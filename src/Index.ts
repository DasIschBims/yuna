import { ExtendedClient } from "./Bot"
import {Logger} from "./utils/logging/Logger";
require("dotenv").config();

export const client = new ExtendedClient();

try {
     client.start().then(() => {
        Logger.logSuccess("Successfully started " + client.user?.tag, "Startup");
    });
} catch (e) {
    Logger.logError(`${e}`, "Startup")
}