module.exports = {
    info: {
        name: "ping",
        description: "Pings the Bot and the API",
        usage: "",
        aliases: [],
        category: 'Information',
    },

    run: async function (client, message, text, arguments) {
        try {
            message.channel.send('Calculating ping...').then((resultMessage) => {
                const ping = resultMessage.createdTimestamp - message.createdTimestamp

                resultMessage.edit(`:ping_pong: Pong! **Bot Latency:** ${ping}ms, **API Latency:** ${client.ws.ping}ms`)
            })
        } catch (err) {
            const channel1 = client.channels.cache.find(channel => channel.id === '803711476635533322')
            const error = new Discord.MessageEmbed()
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