import {ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {getRandomColor} from "../../../utils/colors/BrandColor";

export default new Command({
    name: "timestamp",
    description: "Generates a timestamp",
    type: ApplicationCommandType.ChatInput,
    dmPermission: true,
    options: [
        {
            name: "type",
            description: "The type of timestamp to generate",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "short time",
                    value: "t"
                },
                {
                    name: "long time",
                    value: "T"
                },
                {
                    name: "short date",
                    value: "d"
                },
                {
                    name: "long date",
                    value: "D"
                },
                {
                    name: "long date with short time",
                    value: "f"
                },
                {
                    name: "long date with day of the week and short time",
                    value: "F"
                },
                {
                    name: "relative",
                    value: "R"
                }
            ]
        },
        {
            name: "date",
            description: "The date to generate the timestamp for (DD/MM/YYYY)",
            type: ApplicationCommandOptionType.String,
            required: true,
            max_length: 10,
            min_length: 10
        },
        {
            name: "time",
            description: "The time to generate the timestamp for (HH:MM:SS)",
            type: ApplicationCommandOptionType.String,
            required: true,
            max_length: 8,
            min_length: 8
        }
    ],
    run: async ({ interaction }) => {
        const type = interaction.options.get("type").value as string;
        const date = interaction.options.get("date")?.value as string;
        const time = interaction.options.get("time")?.value as string;

        const timestamp = new Date(`${date} ${time}`).getTime();
        const timestampString = `<t:${Math.floor(timestamp / 1000)}:${type}>`;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(getRandomColor())
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Raw Generated Timestamp",
                            value: `\`\`\`${timestampString}\`\`\``,
                            inline: true
                        }
                    )
            ]
        });
    }
});