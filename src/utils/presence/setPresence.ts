import {ExtendedClient} from "../../structs/client";
import {ActivityType} from "discord-api-types/v10";
import {PresenceData} from "discord.js";
import {Logger} from "../logging/logger";

export function setPresence(client: ExtendedClient, presence: PresenceData = {
    activities: [{
        name: "errors and bugs",
        type: ActivityType.Listening
    }],
    status: "dnd"
}) {
    client.user?.setPresence(presence);
    Logger.log(`Presence set: "${
        presence.activities[0].type === 1 ?
            "Streaming" : presence.activities[0].type === 2 ? 
            "Listening to" : presence.activities[0].type === 3 ?
            "Watching" : presence.activities[0].type === 5 ?
            "Competing in" : ""
    } ${presence.activities[0].name}" with status "${presence.status}"`, "Presence");
}