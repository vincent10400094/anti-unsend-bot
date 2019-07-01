const lineMessageSender = require('../utils/lineMessageSender');
var records = new Map();

module.exports.updateMessages = (data, member) => {
	if (!records.get(data.source.groupId)) {
		records.set(data.source.groupId, new Map());
	}
	records.get(data.source.groupId).set(member, data.message.text);
	records.get(data.source.groupId).set('lastMessage', data.message.text);
	return;
};

module.exports.getMessages = async (data, member) => {
	let reply = records.get(data.source.groupId).get(member) || 'Member does not exist or last messages not recorded';
	await lineMessageSender(data, reply);
	return;
};