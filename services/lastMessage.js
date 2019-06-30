const lineMessageSender = require('../utils/lineMessageSender');
var lastMessages = new Map();

module.exports.update = (data) => {
	lastMessages.set(data.source.groupId, data.message.text);
	return;
}

module.exports.getLastMessage = async (data) => {
	var lastMessage = lastMessages.get(data.source.groupId) || 'Last message not recorded';
	await lineMessageSender(data, lastMessage);
	return;
}