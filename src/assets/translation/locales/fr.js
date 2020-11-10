module.exports = {
    index: {
        notifications: {
            ready: '{{ someone }} est prêt !'
        },
        errors: {
            unknownCommand: 'Hmm... Je ne connais pas cette coammande !',
            noArgs: 'Tu n\'as fourni aucun argument !',
            noUsage: '\nLa bonne manière d\'utiliser la commande est : \`{{ usage }}\`',
            notInDm: 'Je ne peux pas exécuter cette commande dans les MPs !',
            errorInCommand: 'Il y a eu une erreur pendant l\'exécution de la commande !'
        }
    },
    commandHi: {
        description: 'Salut !',
        hi: 'Salut {{ someone }}'
    },
    commandMusic: {
        description: 'Jouer de la musique venant de YouTube',
        errors: {
            notInVoiceChannelForListenning: 'Tu dois être dans un salon vocal pour écouter de la musique !',
            notInVoiceChannelForSkipping: 'Tu dois être dans un salon vocal pour passer la musique !',
            notInVoiceChannelForStopping: 'Tu dois être dans un salon vocal pour arrêter la musique !',
            noPermission: 'J\' ai besoin des permissions pour rejoindre et parler dans ton salon vocal !',
            noInstruction: 'Tu dois donner une instruction parmi \`play|skip|stop\`',
            noSong: 'Il n\'y a plus de musiques que je pourrais passer !',
            lastSong: 'Tu écoute actuellement la dernière musique !',
            noMusic: 'Je ne joue pas de musique !'
        },
        notifications: {
            play: 'Lancement de la musique : **{{ song }}**',
            musicInQueue: '**{{ song }}** a été ajouté à la file d\'attente !'
        }
    },
    commandNasa: {
        description: 'Différentes commandes pour récupérer des données spatiales venant de la NASA',
        errors: {
            error: 'Erreur',
            invalidUsage: 'Tu dois donner une instruction parmi \`{{ usage }}\`',
            tooManyRequests: 'Trop de requêtes ont été faites, réessaie plus tard.'
        },
        apod: {
            titleEmbed: 'Astronomy Picture of the Day',
            fields: {
                titlePicture: {
                    title: 'Titre'
                },
                explaination: {
                    title: 'Explication',
                    readMore: '...\nLire plus avec ce lien : https://apod.nasa.gov/apod'
                }
            }
        },
        mars: {
            titleEmbed: 'Photo de Mars prise récemment par Curiosity',
            fields: {
                rover: {
                    title: 'Rover'
                },
                earthDate: {
                    title: 'Date terrestre'
                },
                camera: {
                    title: 'Caméra'
                }
            }
        }
    },
    commandTicTacToe: {
        description: 'Jouer au morpion',
        errors: {
            twoPlayers: 'S\'il te plaît, taggue 2 joueurs.',
            noBotAllowed: 'Les joueurs ne peuvent être des bots.'
        },
        notifications: {
            turn: 'C\'est au tour de {{ userPlaying }} ! ({{ sign }})',
            lost: 'La partie est finie et {{ userPlaying }} ({{ sign }}) a gagné !',
            nobodyWon: 'La partie est finie et personne n\'a gagné !'
        }
    }
};