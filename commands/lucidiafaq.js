const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "lucidiafaq",
        description: "Make the FAQ",
        usage: "",
        aliases: [],
    },

    run: async function(client, message){
        if (message.author.id !== '780818479376236555') return message.channel.send('You can\'t use this command.')
            .then(m => m.delete({timeout: 5000}))

        let info = new MessageEmbed()
            .setTitle("Lucidia FAQ")
            .setColor('RED')
            .setDescription(`
        **Q1:** How do I invite the bot?
        **A1:** *invite

        **Q2:** What is Lucidia?
        **A2:** Lucidia is the official companion of https://lucidialearning.com

        **Q3:** How do I use the bot?
        **A3:** Do *help
        `)
            .setFooter(``)

        message.channel.send(info)
    }
}
