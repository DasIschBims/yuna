import {ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder} from "discord.js";
import {Command} from "../../../structs/Command";
import {getRandomColor} from "../../../utils/colors/BrandColor";
import {stripIndents} from "common-tags";

export default new Command({
    name: "info",
    description: "Display your or another users info",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "The user to display info for",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    dmPermission: false,
    run: async ({ interaction }) => {
        const user = interaction.options.getUser("user") ?? interaction.user;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
                    .setColor(getRandomColor())
                    .setFooter({iconURL: interaction.user.displayAvatarURL(), text: "Requested by " + interaction.user.tag})
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Userinfo",
                            value: stripIndents`\`\`\`asciidoc
                            = User =
                            • Username :: ${user.username}
                            • ID       :: ${user.id}
                            ${user.tag ? `• Tag      :: ${user.tag.replace(user.username, "")}` : ""}
                            • Created  :: ${user.createdAt.getUTCDate()}/${user.createdAt.getUTCMonth()}/${user.createdAt.getUTCFullYear()}
                            
                            = Member =
                            • Joined   :: ${interaction.guild.members.cache.get(user.id).joinedAt.getUTCDate()}/${interaction.guild.members.cache.get(user.id).joinedAt.getUTCMonth()}/${interaction.guild.members.cache.get(user.id).joinedAt.getUTCFullYear()}
                            • Roles    :: ${interaction.guild.members.cache.get(user.id).roles.cache.size}
                            • Nickname :: ${interaction.guild.members.cache.get(user.id).nickname ?? "None"}
                            \`\`\``
                        }
                    )
            ]
        });
    }
});