const Discord = require('discord.js')

module.exports = {
    info: {
        name: "update",
        description: "Update Lucidia",
        usage: " <version>",
        aliases: ["up"],
        category: 'Owner',
    },

    run: async function (client, message, args) {
        if (message.author.id !== '780818479376236555') return message.channel.send(':x:');
        if (!args[0]) return message.channel.send(`You must specify a version. Ex. \`*update 1.0\``)
        const channelId = client.channels.cache.find(ch => ch.id === '811406348167413760')
        const channelId2 = client.channels.cache.find(ch => ch.id === '811592448673185802')
        if (args[0] === '1.0') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Update v1.0')
                .setDescription(`
The bot is finally released, and I know me and my fellow devs have been waiting a while for this. Here are a list of commands added in v1.0.0.

**Commands:**
\`${client.config.prefix}help [command]\` - Show a List of All Commands
\`${client.config.prefix}invite\` - See this Bot's Invite Links
\`${client.config.prefix}ping\` = Ping the Bot and the API
\`${client.config.prefix}suggest <suggestion>\` - Send a Suggestion to <#756310243046195330>
\`${client.config.prefix}reportbug <bug>\` - Report a Bug to <#811376961045397504>

[Support Server](https://discord.gg/mQC6akazyG) | [Bot Invite](https://discord.com/oauth2/authorize?client_id=811347806853136445&scope=bot&permissions=2147483647)
                `)
                .setTimestamp()
            channelId2.send(`<@&814143359160418386>`, embed)
            channelId.send(`<@&811052627415531532>`, embed)
        } else if (args[0] === '1.1') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Update v1.1')
                .setDescription(`
This is the math update. Now you can add, subtract, multiply, and divide.

**Commands:**
\`${client.config.prefix}add <number 1> <number 2> [optional numbers 3-10]\` - Add Numbers
\`${client.config.prefix}subtract <number 1> <number 2>\` - Subtract Numbers
\`${client.config.prefix}multiply <number 1> <number 2> [optional number 3]\` - Multiply Numbers
\`${client.config.prefix}divide <number 1> <number 2>\` - Divide Numbers

[Support Server](https://discord.gg/mQC6akazyG) | [Bot Invite](https://discord.com/oauth2/authorize?client_id=811347806853136445&scope=bot&permissions=2147483647)
                `)
                .setTimestamp()
            channelId2.send(`<@&814143359160418386>`, embed)
            channelId.send(`<@&811052627415531532>`, embed)
        } else if (args[0] === '1.2') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Update v1.2')
                .setDescription(`
This update was something I've been trying to pull off for months. Do \`/setprefix <prefix>\` tp set the new prefix for your server.

**Commands:**
\`*setprefix <prefix>\` - Sets the New Server Prefix

**Features:**
Per-Server Prefix

[Support Server](https://discord.gg/mQC6akazyG) | [Bot Invite](https://discord.com/oauth2/authorize?client_id=811347806853136445&scope=bot&permissions=2147483647)
                `)
                .setTimestamp()
            channelId2.send(`<@&814143359160418386>`, embed)
            channelId.send(`<@&811052627415531532>`, embed)
        } else if (args[0] === '1.3') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Update v1.3')
                .setDescription(`
This update put all the math commands (and a little more) into one. It's an advanced math command. More is explained in \`*help\` (its page was updated).

**Commands:**
\`*math <equation>\` - Do some Advanced Math

[Support Server](https://discord.gg/mQC6akazyG) | [Bot Invite](https://discord.com/oauth2/authorize?client_id=811347806853136445&scope=bot&permissions=2147483647)
                `)
                .setTimestamp()
            channelId2.send(`<@&814143359160418386>`, embed)
            channelId.send(`<@&811052627415531532>`, embed)
        }
    }
}