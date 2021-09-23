client.on("guildCreate", guild => {
    console.log(`Entrei no servidor ${guild.name} | ${guild.id}. Quantidade de membros do servidor: ${guild.memberCount}.`)
    console.log(`Agora, faço parte de ${client.guilds.size} servidores.`)
})
