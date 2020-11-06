const blank = ':white_large_square:';
const cross = ':regional_indicator_x:';
const circle = ':o2:';
const reactionsTop = ['↖️', '⬆️', '↗️'];
const reactionsMiddle = ['⬅️', '⏺', '➡️'];
const reactionsBottom = ['↙️', '⬇️', '↘️'];
const allReactions = reactionsTop.concat(reactionsMiddle, reactionsBottom);

let user1;
let user2;
let userPlaying;

module.exports = {
	name: 'tictactoe',
	description: 'Play a game of tic-tac-toe',
	args: true,
	usage: '<user1> <user2>',
	guildOnly: true,
	execute(message, args, sigma) {
		// Checks if the user typed the command with the right format
		if (args.length >= 2) {
			user1 = message.mentions.users.get(args[0].substr(3, args[0].length - 4));
			user2 = message.mentions.users.get(args[1].substr(3, args[1].length - 4));
			if (!user1 || !user2) return message.reply('Please tag exactly 2 people.');
			user1.sign = cross;
			user2.sign = circle;

			start(message, sigma);
		} else {
			return message.reply('Please tag exactly 2 people.');
		}
	}
};

function start(message, sigma) {
	let userMessage;
	let gridMessage;
	let gridArray = [
		[blank, blank, blank, '\n'],
		[blank, blank, blank, '\n'],
		[blank, blank, blank, '\n']
	];

	// Randomly determines the player who starts
	userPlaying = Math.random() < 0.5 ? user1 : user2

	// Message to say whose turn it is
	message.channel.send(`It's ${userPlaying}'s turn! (${userPlaying.sign})`)
		.then(message => userMessage = message);

	// Message with the grid and the reactions as controls
	message.channel.send(buildGridString(gridArray))
		.then(message => {
			gridMessage = message;
			allReactions.forEach(reaction => gridMessage.react(reaction).catch(err => console.log(err)));
		});

	// Reaction listener when someone reacts to the gridMessage
	sigma.on('messageReactionAdd', (reaction, user) => {
		if (allReactions.includes(reaction.emoji.name) && reaction.message.id === gridMessage.id && user.id === userPlaying.id) {
			update(reaction.emoji.name, gridArray, gridMessage, userMessage);
		}
	});
}

function update(emoji, gridArray, gridMessage, userMessage) {
	let emojiIndex = allReactions.indexOf(emoji);
	let firstIndex = 0; // First index in the 2-dimension array gridArray
	let secondIndex = 0; // Second index in the 2-dimension array gridArray

	if (emojiIndex < 3) {
		// Emoji describes a cell in the top line
		firstIndex = 0;
		secondIndex = reactionsTop.indexOf(emoji);
	} else if (emojiIndex >= 3 && emojiIndex < 6) {
		// Emoji describes a cell in the middle line
		firstIndex = 1;
		secondIndex = reactionsMiddle.indexOf(emoji);
	} else if (emojiIndex >= 6) {
		// Emoji describes a cell in the bottom line
		firstIndex = 2;
		secondIndex = reactionsBottom.indexOf(emoji);
	}

	// We want to update the cell only if nobody has played there yet
	if (gridArray[firstIndex][secondIndex] === blank) {
		gridArray[firstIndex][secondIndex] = userPlaying.sign;
		gridMessage.edit(buildGridString(gridArray)).catch(err => console.log(err));

		if (getGameState(gridArray) === 'win') {
			gridMessage.reactions.removeAll().catch(err => console.log(err));
			return userMessage.edit(`Game is over and ${userPlaying} (${userPlaying.sign}) won!`).catch(err => console.log(err));
		} else if (getGameState(gridArray) === 'full') {
			gridMessage.reactions.removeAll().catch(err => console.log(err));
			return userMessage.edit(`Game is over and nobody won!`).catch(err => console.log(err));
		} else {
			userPlaying = userPlaying.id === user1.id ? user2 : user1;
			userMessage.edit(`It's ${userPlaying}'s turn! (${userPlaying.sign})`).catch(err => console.log(err));
		}
	}
}

function getGameState(gridArray) {
	let gridFull = true;

	for(let i = 0; i < gridArray.length; i++) {
		// Checks if the grid is full and nobody won
		for(let j = 0; j < gridArray[i].length; j++) {
			if (gridArray[i][j] === blank) {
				gridFull = false;
			}
		}

		// Checks if there's a horizontal line
		if (gridArray[i][0] !== blank && gridArray[i][0] === gridArray[i][1] && gridArray[i][1] === gridArray[i][2]) return 'win';

		// Checks if there's a vertical line
		if (gridArray[0][i] !== blank && gridArray[0][i] === gridArray[1][i] && gridArray[1][i] === gridArray[2][i]) return 'win';
	}

	if (gridFull) return 'full';

	// Checks if there's a diagonal line
	if (
		(gridArray[0][0] !== blank && gridArray[0][0] === gridArray[1][1] && gridArray[1][1] === gridArray[2][2]) ||
		(gridArray[0][2] !== blank && gridArray[0][2] === gridArray[1][1] && gridArray[1][1] === gridArray[2][0])
	) return 'win';
}

// Builds the string for the message from the array representing the grid
function buildGridString(gridArray) {
	let gridString = '';
	gridArray.forEach(row => {
		gridString += row.join('');
	});
	return gridString;
}