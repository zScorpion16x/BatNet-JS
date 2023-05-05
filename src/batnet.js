const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const { readdirSync } = require('fs');

////// VARIABLES //////

const config = require('./config/config.json');
const premium = require('./commands/utilities/premium.json')
const util = require('./commands/utilities/ignore.json');
const blacklist = require('./commands/utilities/blacklist.json');
const emojis = require('./commands/utilities/emojis.json');
const batnet = new Discord.Client();

////// IGNORE //////

process.on('uncaughtException', (err) => {
    console.error(chalk.red(`\n[ BATNET ] An error has occurred:\n${err}`));
});

////// BANNER //////

batnet.on('ready', () => {
     console.clear()
     console.log(chalk.green(`
 ▄▄▄▄    ▄▄▄     ▄▄▄█████▓ ███▄    █ ▓█████▄▄▄█████▓
▓█████▄ ▒████▄   ▓  ██▒ ▓▒ ██ ▀█   █ ▓█   ▀▓  ██▒ ▓▒
▒██▒ ▄██▒██  ▀█▄ ▒ ▓██░ ▒░▓██  ▀█ ██▒▒███  ▒ ▓██░ ▒░
▒██░█▀  ░██▄▄▄▄██░ ▓██▓ ░ ▓██▒  ▐▌██▒▒▓█  ▄░ ▓██▓ ░ 
░▓█  ▀█▓ ▓█   ▓██▒ ▒██▒ ░ ▒██░   ▓██░░▒████▒ ▒██▒ ░ 
░▒▓███▀▒ ▒▒   ▓▒█░ ▒ ░░   ░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒ ░░   
▒░▒   ░   ▒   ▒▒ ░   ░    ░ ░░   ░ ▒░ ░ ░  ░   ░    
 ░    ░   ░   ▒    ░         ░   ░ ░    ░    ░      
 ░            ░  ░                 ░    ░  ░        
      ░                                             
     `));
     console.log(chalk.red(`[ BATNET ] Logged in as: ${batnet.user.tag}`));
     console.log(chalk.blue(`\n[ BATNET ] The emojis have been loaded`));
     console.log(chalk.blue(`[ BATNET ] The config have been loaded`));
     console.log(chalk.blue(`[ BATNET ] The premium list have been loaded`));
     console.log(chalk.blue(`[ BATNET ] The blacklist have been loaded`));

     /*
     "server_name": "SERVER NAME",
     "nuke_channel": "NUKE CHANNEL",
     "raid_channel": "RAID CHANNEL",
     "webhook_url": "WEBHOOK",
     "server_logo": "SERVER LOGO",
     "role_name": "ROLE NAME"
     */

     if (util.nuke_channel === "NUKE CHANNEL" && util.raid_channel === "RAID CHANNEL" && util.server_logo === "SERVER LOGO" && util.server_name === "SERVER NAME" && util.webhook_url === "WEBHOOK" && util.role_name === "ROLE NAME") {
          console.log(chalk.yellow(`\n[ BATNET ] Warning: The configuration file 'commands/utilities/ignore.json' has unconfigured values.\n`));
     } 
     if (premium.ids.length === 0) {
          console.log(chalk.yellow(`\n[ BATNET ] Warning: The configuration file 'commands/utilities/premium.json' does not have any added ids.\n`));
     }

     
     batnet.user.setPresence({
          status: 'dnd',
          activity: {
               name: '#DeathTeam | .gg/DeathTeam',
               type: 'STREAMING'
          }
     })
     
});

////// HANDLING //////

batnet.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
     const command = require(`./commands/${file}`);
     batnet.commands.set(command.name, command);
}

////// EXECUTE //////

batnet.on('message', async msg => {
     if(msg.author.bot) return;
     
     if (!msg.content.startsWith(config.prefix)) return;
     
     if (blacklist.ids.includes(msg.author.id))
          return msg.channel.send({
               embed: {
                    description: `${emojis.bat} **| You are in the bot's blacklist.**`,
                    author: {
                              name: 'Death Team',
                              url: 'https://discord.gg/DeathTeam',
                              icon_url: 'https://cdn.discordapp.com/emojis/1091519096291590174.gif?v=1&size=48&quality=lossless'
                         },
                         thumbnail: {
                              url: util.server_logo
                         },
                         footer: {
                              text: '#DeathTeam',
                              icon_url: 'https://cdn.discordapp.com/emojis/1081703117952921670.png?v=1&size=48&quality=lossless'
                         },
                         color: 0x0000
                    }
          });
     
     const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase(); 
     
     const cmd = batnet.commands.find((c) => c.name === command || c.aliases && c.aliases.includes(command))
     
     if(cmd){
          cmd.execute(batnet, msg, args)
     }
});

////// LOGIN //////

batnet.login(config.token)

require('http').createServer((_, res) => res.end('Bot ready')).listen(4646);
