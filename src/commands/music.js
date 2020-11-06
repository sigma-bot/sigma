const yts = require('yt-search');
const ytdl = require('ytdl-core');

const queue = new Map();

module.exports = {
	name: 'music',
	description: 'Play music from YouTube',
	args: true,
	usage: '<play|skip|stop> <search_string>',
	guildOnly: true,
	execute(message, args) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('You must be in a voice channel to music music!');
		} else {
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.reply('I need the permissions to join and speak in your voice channel!');
			}
		}

		const serverQueue = queue.get(message.guild.id);
		const action = args.shift().toLowerCase();
		const searchString = args.join(' ');

		switch(action) {
			case 'play':
				execute(message, serverQueue, searchString);
				break;
			case 'skip':
				skip(message, serverQueue);
				break;
			case 'stop':
				stop(message, serverQueue);
				break;
			default:
				return message.reply('You must give an instruction among \`play|skip|stop\`');
		}
	}
};

function execute(message, serverQueue, searchString) {
	yts(searchString, async (err, result) => {
		if (err) throw err;
		let song = result.videos[0];
		const voiceChannel = message.member.voice.channel;

		if (!serverQueue) {
			let queueContract = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};

			queue.set(message.guild.id, queueContract);
			queueContract.songs.push(song);

			try {
				queueContract.connection = await voiceChannel.join();
				play(message.guild, queueContract.songs[0]);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		} else {
			serverQueue.songs.push(song);
			return message.channel.send(`**${song.title}** has been added to the queue!`);
		}
	});
}

function skip(message, serverQueue) {
	if (!message.member.voice.channel) return message.reply('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.reply('There is no song that I could skip!');
	if (serverQueue.songs.length > 1) {
		serverQueue.connection.dispatcher.end();
	} else {
		return message.reply('You are currently listening to the last song!');
	}
}

function stop(message, serverQueue) {
	if (!message.member.voice.channel) return message.reply("You have to be in a voice channel to stop the music!");
	if (!serverQueue) return message.reply('I\'m not playing music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	if (song) {
		const dispatcher = serverQueue.connection
			.play(ytdl(song.url))
			.on('finish', () => {
				serverQueue.songs.shift();
				play(guild, serverQueue.songs[0]);
			})
			.on('error', error => console.error(error));

		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		serverQueue.textChannel.send(`Start playing: **${song.title}**`);
	} else {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
	}
}