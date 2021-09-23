// Importar módulos necessários:
const { Client } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Importar módulo de intervalo para os comandos
const ms = require('ms');

// Criar a instância do bot:
const client = new Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_WEBHOOKS", "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS"] });

// Carregar comandos e categorias:
const commandFolders = fs.readdirSync('/commands');
for (const category in commandFolders) {
    const commandFiles = fs.readdirSync(`/commands/${category}`).filter(file => file.endsWith('.js'));
    for (const file in commandFiles) {
        const command = require(`./commands/${category}/${file}`)
        client.commands.set(command.name, command);
    }
}

// Cuidar de erros:
client.on('error', console.error);

// Quando o bot estiver pronto, executar o seguinte código, uma vez:
client.once('ready', () => {
    console.log(`${client.user.username} está online!`);
})

// Cuidar de comandos, desde que a mensagem comece com o prefixo:
const timeout = new Discord.Collection();
client.on('message', async (message) => {
    if (message.author.client) return;
    // Ignorar comandos enviados como mensagens privadas
    if (message.channel.type === 'dm') return;

    if (message.content.startsWith(process.env.PREFIX)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command) {
            if (command.cooldown) {
                if (timeout.has(`${command.name}${message.author.id}`)) return message.reply('Aguarde mais \`${ms(timout.get(`${command.name}${message.author.id}`) - Date.now(), (long: true))\` antes de usar este comando novamente.')
                command.run(client, message, args)
                timeout.set(`${command.name}${message.author.id}`, Date.now() - command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown) 
            } else command.run(client, message, args);
        }
    }
})

// Conectar-se à API do Discord com nosso Token:
client.login(process.env.TOKEN)