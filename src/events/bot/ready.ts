import {client} from "../../index";
import {Event} from "../../types/event";
import {ActivityType} from "discord-api-types/v10";
import {Logger} from "../../utils/logging/logger";

export default new Event({
    name: "ready",
    once: true,
    run() {
        Logger.logInfo("Registered " + client.commands.size + " commands", "Startup");
        Logger.logInfo("Registered " + client.buttons.size + " buttons", "Startup");
        Logger.logInfo("Registered " + client.selects.size + " selects", "Startup");
        Logger.logInfo("Registered " + client.modals.size + " modals", "Startup");
        Logger.logInfo("Registered " + client.events.size + " events", "Startup");
        Logger.logSuccess("Successfully logged in as " + client.user?.tag, "Startup");

        client.user.setPresence({
            activities: [{
                name: "errors and bugs",
                type: ActivityType.Listening
            }],
            status: "dnd"
        });
    },
})