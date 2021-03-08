const { evaluate } = require('mathjs')
const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "math",
        description: "Do some advanced Math",
        usage: "<equation>",
        aliases: ["m"],
        category: 'Information',
    },

    run: async function(client, message, args) {
        if (!args.length) return message.channel.send('You must provide an equation.')
        try {
            let input = args.join(' ')
            input = input.replace(/pie/gi, 'pi')
            let array = input.split(/ +g/)
            input.split(/ +g/).map((value, index) => {
                if (value.toLowerCase() === 'sq' && !value.toLowerCase().startsWith("sq(")) {
                    if (!array[index+1]) throw {err: 'No Index'}
                    if (isNaN(array[index+1])) throw {err: 'Not Number'}
                    array[index] = `sqrt(${array[index+1]})`
                    array[index+1] = undefined
                    input = array.filter(val => val != undefined).join(' ')
                } else if (value.toLowerCase().startsWith("sq(")) {
                    array[index] = array[index].replace(/sq/gi, 'sqrt')
                    input = array.filter(val => val != undefined).join(' ')
                }
            })
            const response = evaluate(input)
            const embed = new MessageEmbed()
                .setTitle('Equation Results')
                .addField('Equation', args.join(' '))
                .addField('Solution', response)
            await message.channel.send(embed)
        } catch (e) {
            return message.channel.send(`I can't seem to solve that equation.`)
        }
    }
}