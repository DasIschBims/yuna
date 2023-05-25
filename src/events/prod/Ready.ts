import {client} from "../../Index";
import {Event} from "../../types/Event";
import {Logger} from "../../utils/logging/Logger";
import {setPresence} from "../../utils/presence/SetPresence";

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