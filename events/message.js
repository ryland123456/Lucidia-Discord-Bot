const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return message.channel.send('I don\'t support DMs due to Discord\'s limitations!')
  //Prefixes also have mention match
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    let pref = db.get(`prefix.${message.guild.id}`);

    let prefix;

    if (!pref) {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : client.config.prefix; // If the server doesn't have any custom prefix, return default.
    } else {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : pref;
    }

  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

  if(!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

    if (message.content === `<@!${client.user.id}>`) {
        const embed = new MessageEmbed()
            .setTitle('Lucidia')
            .setDescription(`Hi! I'm ${client.user.username}, and I am you're official Lucidia Companion! Check out our website at https://www.lucidialearning.com`)
            .addField('Prefix', prefix)
            .setFooter(`The prefix can be changed with ${prefix}prefix <new prefix>. It can be set to the default with ${prefix}prefix default`)
            .setTimestamp()
        message.channel.send(embed)
    }

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
  //Making the command lowerCase because our file name will be in lowerCase
  const command = args.shift().toLowerCase();

  //Searching a command
  const cmd = client.commands.get(command);
  //Searching a command aliases
  const aliases = client.commands.find(x => x.info.aliases.includes(command))

  //if(message.channel.type === "dm")return message.channel.send("None of the commands work in DMs. So please use commands in server!")
process.on("unhandledRejection", (reason, promise) => {
    try {
        console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
    } catch {
        console.error(reason);
    }
});
require('events').EventEmitter.defaultMaxListeners = 25


  //Executing the codes when we get the command or aliases
  if(cmd){
    cmd.run(client, message, args);
  }else if(aliases){
    aliases.run(client, message, args);
  }else return
};
