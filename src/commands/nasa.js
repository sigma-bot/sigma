const Discord = require('discord.js');
const axios = require('axios');

const axiosInstance = axios.create({
	baseURL: 'https://api.nasa.gov'
});

axiosInstance.interceptors.request.use(
	(config) => {
		config.url += config.url.includes('?') ? '&' : '?';
		config.url += 'api_key=DEMO_KEY';
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const pathApod = '/planetary/apod';
const pathMars = '/mars-photos/api/v1';

module.exports = {
	name: 'nasa',
	description: 'Different commands to fetch data about space from the NASA.',
	args: true,
	usage: '<apod|mars>',
	guildOnly: false,
	execute(message, args) {
		const action = args.shift().toLowerCase();

		switch (action) {
			case 'apod':
				apod(message);
				break;
			case 'mars':
				mars(message);
				break;
			default:
				return message.reply(`You must give an instruction among \`${this.usage}\``);
		}
	}
};

function apod(message, date) {
	const today = new Date();
	const dateOfPicture = date ? date : today;

	axiosInstance.get(`${pathApod}?date=${getDateString(dateOfPicture)}`)
		.then(response => {
			const readMore = '...\nRead more with this link: https://apod.nasa.gov/apod';
			let explaination = response.data.explanation;

			if (explaination.length > 1024) {
				explaination = explaination.substr(0, 1024 - readMore.length) + readMore;
			}

			const embed = new Discord.MessageEmbed()
				.setColor('#2a3d92')
				.setTitle('Astronomy Picture of the Day')
				.addField('Title', response.data.title)
				.addField('Explanation', explaination)
				.setImage(response.data.hdurl);

			if (response.data.copyright) {
				embed.setFooter(response.data.copyright);
			}

			message.channel.send(embed);
		}).catch(err => {
			if (err.response.status === 404) {
				dateOfPicture.setDate(dateOfPicture.getDate() - 1);
				apod(message, dateOfPicture);
			} else {
				console.log(err);
			}
		});
}

function mars(message) {
	axiosInstance.get(`${pathMars}/manifests/curiosity`)
		.then(response => {
			const maxDate = response.data.photo_manifest.max_date;
			axiosInstance.get(`${pathMars}/rovers/curiosity/photos?earth_date=${maxDate}`)
				.then(response => {
					const randomIndex = Math.floor(Math.random() * response.data.photos.length);
					const randomPhoto = response.data.photos[randomIndex];
					const embed = new Discord.MessageEmbed()
						.setColor('#2a3d92')
						.setTitle('Photo of Mars recently taken by Curiosity')
						.addFields(
							{ name: 'Rover', value: randomPhoto.rover.name, inline: true },
							{ name: 'Earth date', value: randomPhoto.earth_date, inline: true },
							{ name: 'Camera', value: randomPhoto.camera.full_name, inline: true },
						)
						.setImage(randomPhoto.img_src);

					message.channel.send(embed);
				})
				.catch(err => nasaErrorHandler(err, message));
		})
		.catch(err => nasaErrorHandler(err, message));
}

function getDateString(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
}

function nasaErrorHandler(error, message) {
	if (error.response.status === 429) {
		const embed = Discord.MessageEmbed()
			.setColor('#2a3d92')
			.setTitle('Error')
			.setDescription('There were too many requests, try again later.');

		message.channel.send(embed);
	}
}