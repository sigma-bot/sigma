const Discord = require('discord.js');
const { prefix, token } = require("./config.json");

const Sigma = new Discord.Client();

Sigma.on('ready', () => console.log("Sigma is ready!"));

Sigma.login(token).catch(err => console.log(err));