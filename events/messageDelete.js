const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = async (client, message) => {
    if (message.author.bot) return
    if (message.partial) await message.fetch()

    let modlog = db.get(`moderation.${message.guild.id}.modlog`)
    if (!modlog) return

    if (message.channel.id === modlog.channel) return

    let toggle = modlog.toggle
    if (!toggle) return

    const embed = new MessageEmbed()
        .setTitle("Action #1 - Message Delete")
        .setDescription(`
**Channel:** <#${message.channel.id}> \`[${message.channel.id}]\`
**Author:** <@!${message.author.id}> \`[${message.author.id}]\`
**Message:** \`[${message.id}]\`
-----------------------------------------------------------------
**Content:**
${message.content}
            `)
        .setFooter(`Message Created`)
        .setTimestamp()
        .setColor(`DARK_VIVID_PINK`)
        .setThumbnail(message.author.displayAvatarURL())
    return message.guild.channels.cache.get(modlog.channel).send(embed)
}