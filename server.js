'use strict';

// configuration files
const config = require('./bot_config');
const setting = require('./setting');

const linebot = require('linebot');
const Database = require('./db.js');

Database.setup();

const bot = linebot(config);

var heyhey = '';

bot.on('message', (event) => {
	// fetching user information
	event.source.profile().then((profile)=> {
		// logging
		console.log(`incomming message '${event.message.text}' from ${profile.displayName}`);
	}).catch((err)=> {
		console.log('get profile error', err);
	});
	if (event.message.text == '沙文') {
		event.reply(heyhey).then((data) => {
			console.log(`auto reply ${event.message.text}`);
		}).catch((err)=>{
			console.log('message failed to send:', err);
		});
	}
	heyhey = event.message.text;
});

bot.listen('/linewebhook', setting.PORT, () => {
	console.log('bot server listen on port:', setting.PORT);
});