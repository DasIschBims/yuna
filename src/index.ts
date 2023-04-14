import {ExtendedClient} from "./structs/client"
import {Logger} from "./utils/logging/logger";
import {config} from "dotenv";

config();

export const client = new ExtendedClient();

try {
    Logger.log("Starting up...", "Startup");
    client.start();
} catch (error) {
    Logger.logError(`${error}`, "Startup");
}