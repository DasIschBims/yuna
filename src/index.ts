import {ExtendedClient} from "./structs/client"
import {Logger} from "./utils/logging/logger";
require("dotenv").config();

export const client = new ExtendedClient();

try {
     client.start();
} catch (e) {
    Logger.logError(`${e}`, "Startup")
}