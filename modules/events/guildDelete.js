client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor ${guild.name} | ${guild.id}`)
    console.log(`Agora, estou em ${client.guilds.size} servidores.`)
})