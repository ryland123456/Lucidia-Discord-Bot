const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    info: {
        name: "help",
        description: "Show a List of All Commands",
        usage: "[command]",
        aliases: ["h"],
        category: 'Information',
    },

    run: async function(client, message, args){
        try {
            let pref = db.get(`prefix.${message.guild.id}`);

            let prefix;

            if (!pref) {
                prefix = client.config.prefix; // If the server doesn't have any custom prefix, return default.
            } else {
                prefix = pref;
            }

            let pages = [`Thanks for inviting ${client.user.username} to your server! This is ${client.user.username}'s help menu/command list. For help per command (aliases, usage, description, etc.), do ${client.config.prefix}help [command]. Turn the page to see the commands...

            React With ◀️ to go Back a Page
            React With ▶️ to go Forward a Page

            Commands With 🥇 Require Premium
            
            **Help Pages**
**Page 1:** :busts_in_silhouette: Help Directory
**Page 2:** :information_source: Information Help
**Page 3:** :ping_pong: Utility Commands
**Page 4:** :heavy_plus_sign: Math Commands
            `, `
            :information_source: **Information Help:**
            \`${prefix}help [command]\` - Show a List of All Commands
            \`${prefix}invite\` - See this Bot's Invite Links
            \`${prefix}ping\` = Ping the Bot and the API`, `
            :ping_pong: **Utility Help**
            \`${prefix}prefix <new prefix>\` - Change the Server-Wide Bot Prefix
            \`${prefix}suggest <suggestion>\` - Send a Suggestion to <#756310243046195330>
            \`${prefix}reportbug <bug>\` - Report a Bug to <#811376961045397504>
            `, `
            :heavy_plus_sign: **Math Help:**
            The \`${prefix}math\` command is a very complex command. Here are a few examples.
            **Addition:** \`${prefix}math 2 + 5\`
            **Subtraction:** \`${prefix}math 17 - 5\`
            **Multiplication:** \`${prefix}math 2 * 4\`
            **Division:** \`${prefix}math 18 / 6\`
            **Square Root:** \`${prefix}math sqrt(16)\`
            **Pi:** \`${prefix}math pi\`
            `]

            let page = 1

            let embed = new MessageEmbed()
                .setAuthor(client.user.username+" Help", "https://hydrostaticcog.org/assets/L.png")
                .setColor("BLUE")
                .setDescription(pages[page-1])
                .setFooter(`Page ${page} of ${pages.length}`)
                .setTimestamp()

            message.channel.send('Help has been sent to your DMs and below :point_down:')
            if(!args[0]) message.channel.send(embed).then(msg => {
                msg.react('◀️').then(r => {
                    msg.react('▶️')

                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id

                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 5000000 })
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 5000000 })

                    backwards.on('collect', r => {
                        if (page === 1) return
                        page--
                        embed.setDescription(pages[page-1])
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)
                    })

                    forwards.on('collect', r => {
                        if (page === pages.length) return
                        page++
                        embed.setDescription(pages[page-1])
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)
                    })
                })
            })
            if(!args[0])return message.author.send(embed).then(msg => {
                msg.react('◀️').then(r => {
                    msg.react('▶️')

                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id

                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 5000000 })
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 5000000 })

                    backwards.on('collect', r => {
                        if (page === 1) return
                        page--
                        embed.setDescription(pages[page-1])
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)
                    })

                    forwards.on('collect', r => {
                        if (page === pages.length) return
                        page++
                        embed.setDescription(pages[page-1])
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)
                    })
                })
            })
            else {
                let cmd = args[0]
                let command = client.commands.get(cmd)
                if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
                if(!command)return message.channel.send("Unknown Command")
                let commandinfo = new MessageEmbed()
                    .setTitle(`${client.config.prefix}`+command.info.name+" Command Information")
                    .setColor("YELLOW")
                    .setDescription(`
    Description: ${command.info.description}
    Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
    Aliases: ${command.info.aliases.join(", ")}
    `)
                message.author.send(commandinfo)
            }
        } catch (err) {
            const channel1 = client.channels.cache.find(channel => channel.id === '803711476635533322')
            const error = new MessageEmbed()
                .setTitle('Error')
                .setColor('RED')
                .addFields(
                    {
                        name: 'Guild Details',
                        value: `ID: \`${message.guild.id}\`
                            Name: \`${message.guild.name}\``,
                        inline: false
                    },
                    {
                        name: 'Channel Details',
                        value: `ID: \`${message.channel.id}\`
                            Name: \`${message.channel.name}\``,
                        inline: false
                    },
                    {
                        name: 'Author Details',
                        value: `ID: \`${message.author.id}\`
                            Name: \`${message.author.tag}\``,
                        inline: false
                    },
                    {
                        name: 'Command Message Details',
                        value: `ID: \`${message.id}\``,
                        inline: false
                    },
                    {
                        name: 'Error',
                        value: `\`\`\`${err}\`\`\``,
                        inline: false
                    })
            await channel1.send(error)
            await message.channel.send(':x: There was an error running the specified command. For support, join our Discord server at https://discord.gg/vvaa5S4zbn')
        }
    }
}
