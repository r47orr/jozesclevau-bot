// Importar módulos necessários:
const { Client, Intents } = require('discord.js');
require('dotenv').config();


// Criar a instância do bot:
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Quando o bot estiver pronto, executar o seguinte código, uma vez:
client.once('ready', () => {
    console.log(`${client.user.username} está online!`);
})

// Conectar-se à API do Discord com nosso Token:
client.login(process.env.TOKEN)