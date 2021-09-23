const discord = require('discord.js');
require('dotenv').config();

module.exports = {
    name = 'ping_pong',
    aliases = ['ping', 'test'],
    cooldown = 2000,
    help = 'Retorna o tempo de resposta do bot em relação à API do Discord',
    usage = `${process.env.PREFIX}ping`,

    async run (client, message, args) {
        const m = await message.reply('Ping!?');
        m.edit(`Pong! Minha latência é ${m.createdTimestamp - message.createdTimestamp}ms`)
    }
}