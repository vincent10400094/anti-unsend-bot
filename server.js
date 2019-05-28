const linebot = require('linebot');
const config = require('./config');
const PORT = 8080;

const bot = linebot(config);

bot.on('message', (event) => {
	// fetching user information
	event.source.profile().then((profile)=> {
		// logging
		console.log(`incomming message '${event.message.text}' from ${profile.displayName}`);
	}).catch((err)=> {
		console.log('get profile error', err);
	});
	event.reply(event.message.text).then((data) => {
		console.log(`auto reply ${event.message.text}`);
	}).catch((err)=>{
		console.log('message failed to send:', err);
	});
});

bot.listen('/linewebhook', PORT, () => {
	console.log('bot server listen on port:', PORT);
});