const translate = require('../assets/translation/translate');

module.exports = {
	name: 'hi',
	description: translate('commandHi.description'),
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.channel.send(translate('commandHi.hi', {someone: message.author}));
	}
};