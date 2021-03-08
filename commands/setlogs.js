const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    info: {
        name: "setlogs",
        description: "Set the Mod Logs Channel",
        usage: "",
        aliases: ["modlogs"],
        category: 'Utility',
    },

    run: async function (client, message, args) {
        if (message.guild.id !== '754368856415535114') return;

        if (message.author.id === '780818479376236555' || message.member.hasPermission('MANAGE_GUILD')) {
            let toggling = ['disable', 'enable']
            if (!toggling.includes(args[0])) {
                return message.channel.send(`Please specify \`enable\` or \`disable\`.`)
            }

            if (args[0] === 'enable') {
                let channel = message.mentions.channels.first();
                if (!channel) return message.channel.send(`Please specify a channel for actions to be logged to.`)

                await db.set(`moderation.${message.guild.id}.modlog.toggle`, true)
                await db.set(`moderation.${message.guild.id}.modlog.channel`, channel.id)
                return message.channel.send(`The logging channel has been enabled and set to <#${channel.id}>`)
            }

            if (args[0] === 'disable') {
                let toggle = db.get(`moderation.${message.guild.id}.modlog.toggle`)
                if (!toggle || toggle === false) return message.channel.send(`The logging channel has not been set yet or has already been disabled.`)
                await db.set(`moderation.${message.guild.id}.modlog.toggle`, false)
                await db.delete(`moderation.${message.guild.id}.modlog.channel`)
                return message.channel.send(`Action logging has been disabled.`)
            } else return;
        }
    }
}