const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('../config/config.json');

const sigma = new Discord.Client();
let commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

sigma.on('ready', () => console.log('sigma is ready!'));

sigma.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!commands.has(commandName)) {
		return message.reply('Hmm... I don\'t know this command!');
	}

	const command = commands.get(commandName);

	if (command.args && !args.length) {
		let reply = 'You didn\'t provide any arguments!';
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.reply(reply);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply("I can't execute that command inside DMs!");
	}

	try {
		command.execute(message, args, sigma);
	} catch (error) {
		console.error(error);
		return message.reply('There was an error trying to execute that command!');
	}
});

sigma.login(token).catch(err => console.log(err));