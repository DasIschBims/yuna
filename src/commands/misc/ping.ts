import { EmbedBuilder } from "discord.js";
import { Command } from "../../structs/Command";

export default new Command({
    name: "ping",
    description: "Displays the bot's latency",
    run: async ({ interaction }) => {
        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor(`#C10C2C`)
                    .setTimestamp()
                    .setTitle("Pong! 🏓")
                    .setDescription(`Ping: **${interaction.client.ws.ping}ms**`)
            ]
        });
    }
});