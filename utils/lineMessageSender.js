const linebotHelper = require('./linebotHelper');
const colors = require('colors');

module.exports = async (data, message) => {
	try {
		await linebotHelper.reply(data.replyToken, message);
		console.log(colors.yellow('[reply]'), `auto reply '${message}'`);
	} catch (error) {
		console.error(colors.red('[reply]'), 'Fail to send message:', error);
	}
}