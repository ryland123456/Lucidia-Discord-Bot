const Discord = require('discord.js')

module.exports = async (client) => {
    console.log(`[API] Logged in as ${client.user.username}. Guild Count: ${client.guilds.cache.size}`);

  const arrayOfStatus = [
    `${client.guilds.cache.size} Servers | ${client.channels.cache.size} Channels | ${client.users.cache.size} Users | ${client.config.prefix}help - ${client.config.prefix}invite | https://dsc.gg/lucidia`,
    `${client.guilds.cache.size} Servers | ${client.channels.cache.size} Channels | ${client.users.cache.size} Users | ${client.config.prefix}help - ${client.config.prefix}invite | https://dsc.gg/lucidia`
  ];

    let index = 0;
    setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity('Ryland Appreciation Week!', {
            type: "WATCHING"
        });
        index++;
    }, 20000)}