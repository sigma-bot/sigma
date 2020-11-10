const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('../config/config.json');
const translate = require('./assets/translation/translate');

const sigma = new Discord.Client();
let commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

sigma.on('ready', () => console.log(translate('index.notifications.ready', {someone: 'sigma'})));

sigma.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!commands.has(commandName)) {
		return message.reply(translate('index.errors.unknownCommand'));
	}

	const command = commands.get(commandName);

	if (command.args && !args.length) {
		let reply = translate('index.errors.noArgs');
		if (command.usage) {
			reply += translate('index.errors.noUsage', {usage: `${prefix}${command.name} ${command.usage}` });
		}
		return message.reply(reply);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply(translate('index.errors.notInDm'));
	}

	try {
		command.execute(message, args, sigma);
	} catch (error) {
		console.error(error);
		return message.reply(translate('index.errors.errorInCommand'));
	}
});

sigma.login(token).catch(err => console.log(err));