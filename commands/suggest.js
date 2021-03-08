const Discord = require('discord.js')

module.exports = {
    info: {
        name: "suggest",
        description: "Send a Suggestion to <#756310243046195330>",
        usage: " <suggestion>",
        aliases: ["sgt"],
        category: 'Utility',
    },

    run: async function (client, message, args) {
        try {
            let botmessage = args.join(" ")
            if(!args[0]) return message.channel.send ('You must specify something to suggest')

            message.channel.send(`
Would you like to suggest a suggestion for our support server (🔥Lucidia✨) or for the bot Lucidia itself?
:one: Server
:two: Bot
        `).then(msg => {
                msg.react('1️⃣').then(r => {
                    msg.react('2️⃣')

                    const serverFilter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id
                    const botFilter = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id

                    const serverSuggest = msg.createReactionCollector(serverFilter, {time: 5000000})
                    const botSuggest = msg.createReactionCollector(botFilter, {time: 5000000})

                    serverSuggest.on('collect', r => {
                        const serverSuggestChannel = client.channels.cache.find(channel => channel.id === '811378112201621544')
                        const serverSuggestChannel2 = client.channels.cache.find(channel => channel.id === '805883838613422132')
                        const suggestEmbed = new Discord.MessageEmbed()
                            .setTitle('Suggestion')
                            .setDescription(`
**Suggester:**
<@${message.author.id}>

**Suggestion:**
${botmessage}

**Reactions:**
React With ✔️ if you Like the Suggestion
React With ❌ if you Do Not Like the Suggestion
Ryland#2049 Can Deny a Suggestion with 🛑
            `)
                            .setTimestamp()

                        message.channel.send('Your suggestion has been sent to #🎫suggestions in our support server.')
                        serverSuggestChannel.send(suggestEmbed).then(msg => msg.react('✔️').then(r => msg.react('❌').then(rc => msg.react('🛑'))))
                        serverSuggestChannel2.send(suggestEmbed).then(msg => msg.react('✔️').then(r => msg.react('❌').then(rc => msg.react('🛑'))))
                    })

                    botSuggest.on('collect', r => {
                        const botSuggestChannel = client.channels.cache.find(channel => channel.id === '756310243046195330')
                        const botSuggestChannel2 = client.channels.cache.find(channel => channel.id === '811593732192337942')
                        const suggestEmbed = new Discord.MessageEmbed()
                            .setTitle('Suggestion')
                            .setDescription(`
**Suggester:**
<@${message.author.id}>

**Suggestion:**
${botmessage}

**Reactions:**
React With ✔️ if you Like the Suggestion
React With ❌ if you Do Not Like the Suggestion
Ryland#2049 Can Deny a Suggestion with 🛑
            `)
                            .setTimestamp()

                        message.channel.send('Your suggestion has been sent to 🤖 | Lucidia Bot > #🔥suggestions in our support server.')
                        botSuggestChannel.send(suggestEmbed).then(msg => msg.react('✔️').then(r => msg.react('❌').then(rc => msg.react('🛑'))))
                        botSuggestChannel2.send(suggestEmbed).then(msg => msg.react('✔️').then(r => msg.react('❌').then(rc => msg.react('🛑'))))
                    })
                })
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
