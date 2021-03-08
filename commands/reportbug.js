const Discord = require('discord.js')

module.exports = {
    info: {
        name: "reportbug",
        description: "Report a Bug to <#811376961045397504>",
        usage: "<bug>",
        aliases: ["bug", "bugreport"],
        category: 'Utility',
    },

    run: async function (client, message, args) {
        try {
            const reportChannel = client.channels.cache.find(channel => channel.id === '811376961045397504')
            const reportChannel2 = client.channels.cache.find(channel => channel.id === '811593497522077738')
            let botmessage = args.join(" ")

            if (!botmessage) return message.channel.send('You must specify something to report.')

            const embed = new Discord.MessageEmbed()
                .setTitle('Bug Report')
                .setDescription(`
**Reporter:**
<@${message.author.id}>

**Bug:**
${botmessage}
            `)
                .setTimestamp()

            message.author.send('Your bug has been reported to <#811376961045397504> in our support server.')
            reportChannel.send(embed)
            reportChannel2.send(embed)
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
