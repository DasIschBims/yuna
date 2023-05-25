import {ExtendedClient} from "./structs/Client";
import {Logger} from "./utils/logging/Logger";
import {config} from "dotenv";

config();

export const client = new ExtendedClient();

try {
    Logger.log("Starting up...", "Startup");
    client.start();
} catch (error) {
    Logger.logError(`${error}`, "Startup");
}