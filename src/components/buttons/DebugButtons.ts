import {ButtonBuilder, ButtonStyle} from "discord.js";

const debugPrimary = new ButtonBuilder()
    .setCustomId("debug-primary")
    .setLabel("Debug Primary")
    .setStyle(ButtonStyle.Primary);

const debugSecondary = new ButtonBuilder()
    .setCustomId("debug-secondary")
    .setLabel("Debug Secondary")
    .setStyle(ButtonStyle.Secondary);

const debugSuccess = new ButtonBuilder()
    .setCustomId("debug-success")
    .setLabel("Debug Success")
    .setStyle(ButtonStyle.Success);

const debugDanger = new ButtonBuilder()
    .setCustomId("debug-danger")
    .setLabel("Debug Danger")
    .setStyle(ButtonStyle.Danger);

export {debugPrimary, debugSecondary, debugSuccess, debugDanger};