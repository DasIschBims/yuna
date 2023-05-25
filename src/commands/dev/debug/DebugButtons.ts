import {ActionRowBuilder, ApplicationCommandType, ButtonBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import debugButtons from "../../../components/buttons/DebugButtons";

export default new Command({
    name: "debug-buttons",
    description: "Developer command",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async ({ interaction }) => {
        await interaction.deferReply();

        await interaction.editReply({
            components: [
                new ActionRowBuilder<ButtonBuilder>().setComponents(
                    debugButtons.get("debug-primary"),
                    debugButtons.get("debug-secondary"),
                    debugButtons.get("debug-success"),
                    debugButtons.get("debug-danger"),
                )
            ]
        });
    }
});