module.exports = {
    index: {
        notifications: {
            ready: '{{ someone }} is ready!'
        },
        errors: {
            unknownCommand: 'Hmm... I don\'t know this command!',
            noArgs: 'You didn\'t provide any arguments!',
            noUsage: '\nThe proper usage would be: \`{{ usage }}\`',
            notInDm: 'I can\'t execute that command inside DMs!',
            errorInCommand: 'There was an error trying to execute that command!'
        }
    },
    commandHi: {
        description: 'Hi!',
        hi: 'Hi {{ someone }}'
    },
    commandMusic: {
        description: 'Play music from YouTube',
        errors: {
            notInVoiceChannelForListenning: 'You must be in a voice channel to listen to music!',
            notInVoiceChannelForSkipping: 'You must be in a voice channel to skip the music!',
            notInVoiceChannelForStopping: 'You must be in a voice channel to stop the music!',
            noPermission: 'I need the permissions to join and speak in your voice channel!',
            noInstruction: 'You must give an instruction among \`play|skip|stop\`',
            noSong: 'There is no song that I could skip!',
            lastSong: 'You are currently listening to the last song!',
            noMusic: 'I\'m not playing music!'
        },
        notifications: {
            play: 'Start playing: **{{ song }}**',
            musicInQueue: '**{{ song }}** has been added to the queue!'
        }
    },
    commandNasa: {
        description: 'Different commands to fetch data about space from the NASA.',
        errors: {
            error: 'Error',
            invalidUsage: 'You must give an instruction among \`{{ usage }}\`',
            tooManyRequests: 'There were too many requests, try again later.'
        },
        apod: {
            titleEmbed: 'Astronomy Picture of the Day',
            fields: {
                titlePicture: {
                    title: 'Title'
                },
                explaination: {
                    title: 'Explaination',
                    readMore: '...\nRead more with this link: https://apod.nasa.gov/apod'
                }
            }
        },
        mars: {
            titleEmbed: 'Photo of Mars recently taken by Curiosity',
            fields: {
                rover: {
                    title: 'Rover'
                },
                earthDate: {
                    title: 'Earth Date'
                },
                camera: {
                    title: 'Camera'
                }
            }
        }
    },
    commandTicTacToe: {
        description: 'Play a game of tic-tac-toe',
        errors: {
            twoPlayers: 'Please tag exactly 2 people.'
        },
        notifications: {
            turn: 'It\'s {{ userPlaying }}\'s turn! ({{ sign }})',
            lost: 'Game is over and {{ userPlaying }} ({{ sign }}) won!',
            nobodyWon: 'Game is over and nobody won!'
        }
    }
};