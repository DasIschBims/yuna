import {ApplicationCommandOptionType,ApplicationCommandType} from "discord.js";
import {Command} from "../../../structs/Command";
import debugModals from "../../../components/modals/DebugModals";

export default new Command({
    name: "debug-modals",
    description: "Developer command",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    options: [
        {
            name: "modal-type",
            description: "Opens a modal",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Short Modal",
                    value: "short"
                },
                {
                    name: "Paragraph Modal",
                    value: "paragraph"
                }
            ],
        }
    ],
    run: async ({ interaction, options}) => {
        const modalType = options.getString("modal-type", true);

        switch (modalType) {
            case "short":
                await interaction.showModal(debugModals.get("debug-short"));
                break;
            case "paragraph":
                await interaction.showModal(debugModals.get("debug-paragraph"));
                break;
            default:
                await interaction.reply({
                    content: "Invalid modal type",
                    ephemeral: true
                });
        }
    }
});