import {ButtonBuilder, ButtonStyle, Collection} from "discord.js";

const debugButtons = new Collection<string, ButtonBuilder>();
debugButtons.set("debug-primary",
    new ButtonBuilder()
        .setCustomId("debug-primary")
        .setLabel("Debug Primary")
        .setStyle(ButtonStyle.Primary)
);

debugButtons.set("debug-secondary",
    new ButtonBuilder()
        .setCustomId("debug-secondary")
        .setLabel("Debug Secondary")
        .setStyle(ButtonStyle.Secondary)
);

debugButtons.set("debug-success",
    new ButtonBuilder()
        .setCustomId("debug-success")
        .setLabel("Debug Success")
        .setStyle(ButtonStyle.Success)
);

debugButtons.set("debug-danger",
    new ButtonBuilder()
        .setCustomId("debug-danger")
        .setLabel("Debug Danger")
        .setStyle(ButtonStyle.Danger)
);

export default debugButtons;