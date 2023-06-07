import {ExtendedClient} from "../../structs/Client";
import {PresenceData} from "discord.js";
import {Logger} from "../logging/Logger";

export function setPresence(client: ExtendedClient, enableLog?: boolean, presence?: PresenceData) {
    let presenceData: PresenceData = presence;

    !presenceData ? presenceData = client.presenceData : null;

    client.user?.setPresence(presenceData);

    enableLog ? Logger.log(`Presence set: "${
        presenceData.activities[0].type === 1 ?
            "Streaming" : presenceData.activities[0].type === 2 ?
                "Listening to" : presenceData.activities[0].type === 3 ?
                    "Watching" : presenceData.activities[0].type === 5 ?
                        "Competing in" : ""
    } ${presenceData.activities[0].name}" with status "${presenceData.status}"`, "Presence") : null;
}