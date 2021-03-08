const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "invite",
    description: "Invite the Bot to Your Server",
    usage: "[bot number]",
    aliases: ["inv"],
    category: 'Information',
  },

  run: async function (client, message, args) {
    try {
        let invite = new MessageEmbed()
            .setTitle(`Lucidia Invite Links`)
            .setDescription(`Want me in your server? Need support? Maybe both? These links can help!\n\n[Invite Link](https://discord.com/oauth2/authorize?client_id=795777717982724106&scope=bot&permissions=2147483647) \n [Support Server Link](https://discord.gg/mQC6akazyG)`)
            .setColor("BLUE")
        message.channel.send(invite);
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
