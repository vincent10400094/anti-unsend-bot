const linebotHelper = require('./linebotHelper');

module.exports = async (data, message) => {
	try {
		await linebotHelper.reply(data.replyToken, message);
		console.log(`[lineMessageSender] message '${message}' sent successfully`);
	} catch (error) {
		console.error('[lineMessageSender] Fail to send message:', error);
	}
}