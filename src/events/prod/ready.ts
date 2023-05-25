import {client} from "../../index";
import {Event} from "../../types/event";
import {Logger} from "../../utils/logging/logger";
import {setPresence} from "../../utils/presence/setPresence";

export default new Event({
    name: "ready",
    once: true,
    run() {
        Logger.logInfo("Registered " + client.commands.size + " commands", "Startup");
        Logger.logInfo("Registered " + client.events.size + " events", "Startup");
        Logger.logSuccess("Successfully logged in as " + client.user?.tag, "Startup");

        setPresence(client);
    },
});