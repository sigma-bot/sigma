module.exports = {
	name: 'hi',
	description: 'Hi!',
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.channel.send(`Hi ${message.author}`);
	}
};