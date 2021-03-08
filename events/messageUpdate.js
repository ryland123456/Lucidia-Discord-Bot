const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return

    if (oldMessage.partial) await oldMessage.fetch()

    let modlog = db.get(`moderation.${oldMessage.guild.id}.modlog`)
    if (!modlog) return

    if (oldMessage.channel.id === modlog.channel) return

    let toggle = modlog.toggle
    if (!toggle) return

    const embed = new MessageEmbed()
        .setTitle("Action #2 - Message Edit")
        .setDescription(`
**Channel:** <#${oldMessage.channel.id}> \`[${oldMessage.channel.id}]\`
**Author:** <@!${oldMessage.author.id}> \`[${oldMessage.author.id}]\`
**Message:** \`[${oldMessage.id}]\`
-----------------------------------------------------------------
**Original Content:**
${oldMessage.content}

**New Content:**
${newMessage.content}
            `)
        .setFooter(`Message Created`)
        .setTimestamp()
        .setColor(`LUMINOUS_VIVID_PINK`)
        .setThumbnail(oldMessage.author.displayAvatarURL())
    return oldMessage.guild.channels.cache.get(modlog.channel).send(embed)
}