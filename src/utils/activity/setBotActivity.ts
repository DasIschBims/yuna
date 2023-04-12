import {ActivityType} from "discord-api-types/v10";
import {client} from "../../index";

interface Activity {
    text?: string;
    type?: ActivityType.Playing | ActivityType.Streaming | ActivityType.Listening | ActivityType.Watching | ActivityType.Competing;
    status?: "online" | "idle" | "dnd" | "invisible";
}

export function setBotActivity(activity: Activity) {
    if (activity.text && activity.status && activity.type) {
        client.user?.setPresence({
            activities: [{
                name: activity.text,
                type: activity.type ?? ActivityType.Listening
            }],
            status: activity.status
        })
    } else if (activity.text) {
        client.user?.setActivity(activity.text, {type: ActivityType.Playing})
    } else if (activity.status) {
        client.user?.setStatus(activity.status)
    }
}