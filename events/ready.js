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
        client.user.setActivity(status, {
            type: "STREAMING",
            url: `https://www.twitch.tv/lucidialearning`,
        });
        index++;
    }, 20000)

    const channelID = client.channels.cache.find(ch => ch.id === '811351353687146516')
    const channelID2 = client.channels.cache.find(ch => ch.id === '811593771103027201')
    let time = Date.now();
    await client.api.channels('811351353687146516').typing.post()
    await client.api.channels('811593771103027201').typing.post()
    let ping = Date.now() - time;
    let guildCount = client.guilds.cache.size
    let userCount = client.users.cache.size
    let channelCount = client.channels.cache.size
    let cmdCount = client.commands.size
    let totalSeconds = (client.uptime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let uptime = `${hours} hours`
    const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s Status`)
        .setColor('LUMINOUS_VIVID_PINK')
        .addField('Guild Count', guildCount, true)
        .addField('User Count', userCount, true)
        .addField('Channel Count', channelCount, true)
        .addField('Message Count', '1000', true)
        .addField('Ping', `${ping}ms`, true)
        .addField('API Latency', `${client.ws.ping}ms`, true)
        .addField('Commands Loaded', cmdCount, true)
        .addField(`Uptime`, uptime, true)
            .addField(`Library`, '[JavaScript (discord.js)](https://www.javascript.com/)', true)
        .setFooter(`This message should update every 15 minutes. Last Update`)
        .setTimestamp()
    channelID.send(embed).then(m => {
        m.delete({timeout: 899990})
    })
    const embed7 = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s Status`)
        .setColor('LUMINOUS_VIVID_PINK')
        .addField('Guild Count', guildCount, true)
        .addField('User Count', userCount, true)
        .addField('Channel Count', channelCount, true)
        .addField('Message Count', '1000', true)
        .addField('Ping', `${ping}ms`, true)
        .addField('API Latency', `${client.ws.ping}ms`, true)
        .addField('Commands Loaded', cmdCount, true)
        .addField(`Uptime`, uptime, true)
            .addField(`Library`, '[JavaScript (discord.js)](https://www.javascript.com/)', true)
        .setFooter(`This message should update every 15 minutes. Last Update`)
        .setTimestamp()
    channelID2.send(embed7).then(m => {
        m.delete({timeout: 899990})
    })

        setInterval(function(){
        const embed2 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}'s Status`)
            .setColor('LUMINOUS_VIVID_PINK')
            .addField('Guild Count', guildCount, true)
            .addField('User Count', userCount, true)
            .addField('Channel Count', channelCount, true)
            .addField('Message Count', '1000', true)
            .addField('Ping', `${ping}ms`, true)
            .addField('API Latency', `${client.ws.ping}ms`, true)
            .addField('Commands Loaded', cmdCount, true)
            .addField(`Uptime`, uptime, true)
            .addField(`Library`, '[JavaScript (discord.js)](https://www.javascript.com/)', true)
            .setFooter(`This message should update every 15 minutes. Last Update`)
            .setTimestamp()
        channelID.send(embed2).then(m => {
            m.delete({timeout: 899990})
        })
    }, 900000);
    setInterval(function(){
        const embed2 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}'s Status`)
            .setColor('LUMINOUS_VIVID_PINK')
            .addField('Guild Count', guildCount, true)
            .addField('User Count', userCount, true)
            .addField('Channel Count', channelCount, true)
            .addField('Message Count', '1000', true)
            .addField('Ping', `${ping}ms`, true)
            .addField('API Latency', `${client.ws.ping}ms`, true)
            .addField('Commands Loaded', cmdCount, true)
            .addField(`Uptime`, uptime, true)
            .addField(`Library`, '[JavaScript (discord.js)](https://www.javascript.com/)', true)
            .setFooter(`This message should update every 15 minutes. Last Update`)
            .setTimestamp()
        channelID2.send(embed2).then(m => {
            m.delete({timeout: 899990})
        })
    }, 900000);
}
