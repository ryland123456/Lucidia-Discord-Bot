const db = require('quick.db')

module.exports = {
    info: {
        name: "prefix",
        description: "Sets the new Server Prefix",
        usage: "<new prefix>",
        aliases: [],
        category: 'Information',
    },

    run: async function (client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have the `Manage Server` permissions required to run this command.");
        let data = db.get(`prefix.${message.guild.id}`);
        if (args[0] === "default") {
            await db.delete(`prefix.${message.guild.id}`);
            return message.channel.send(`The server prefix has been changed to the default (${client.config.prefix}).`);
        }

        let symbol = args.join(" ");
        if (!symbol) return message.channel.send("Please input the prefix.");

        db.set(`prefix.${message.guild.id}`, symbol);
        return message.channel.send(`The server prefix has been changed to **${symbol}**`);
    }
}
