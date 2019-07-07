const lineMessageSender = require('../utils/lineMessageSender');
const config = require('config');
var records = new Map();

module.exports.updateMessages = (data, member) => {
	let group = records.get(data.source.groupId);
	if (!group) {
		group = new Map();
		records.set(data.source.groupId, group);
	}
	let messages = group.get(member);
	if (messages) {
		messages.push(data.message.text);
		if (messages.length > config.get('ghost.limit'))
			messages.shift();
	} else {
		let messages = new Array();
		messages.push(data.message.text);
		group.set(member, messages);
	}
	group.set('lastMessage', data.message.text);
	return;
};

module.exports.getMessages = async (data, member) => {
	try {
		var reply = records.get(data.source.groupId).get(member) || 'Member does not exist or last messages not recorded';
	} catch (error) {
		var reply = 'Member does not exist or last messages not recorded';
	}
	await lineMessageSender(data, reply);
	return;
};