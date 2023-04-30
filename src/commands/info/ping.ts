import {ApplicationCommandType, EmbedBuilder} from "discord.js";
import {Command} from "../../structs/command";
import {getRandomColor} from "../../utils/colors/brandColors";

export default new Command({
    name: "ping",
    description: "Displays the bots latency",
    type: ApplicationCommandType.ChatInput,
    dmPermission: true,
    run: async ({ interaction }) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .setTitle("Pong! 🏓")
                    .setDescription(`Ping: **${interaction.client.ws.ping}ms**`)
            ]
        });
    }
});