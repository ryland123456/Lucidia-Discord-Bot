require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client, MessageEmbed } = require("discord.js");

const client = new Client();
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
    prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(__dirname + `/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log("Loading Event: "+eventName)
    });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log("Loading Information Command: "+commandName)
    });
});

let memberlog = "811290535032913970";

client.on("guildMemberAdd", member => {
    if (member.guild.id !== "520423098906968065") return;

    client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
    member.roles.add("589062368126959635"); // Member role.
})

//Logging in to discord
client.login(process.env.TOKEN)
