const lineMessageSender = require('../utils/lineMessageSender');
const messageGenerator = require('../utils/messageGenerator');

module.exports = async (data) => {
	await lineMessageSender(data, messageGenerator.getManual());
	return;
}