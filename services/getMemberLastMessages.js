const lineMessageSender = require('../utils/lineMessageSender');
const config = require('config');

records = {};

module.exports.updateMessages = (data, member) => {
	let group = records[data.source.groupId];
	if (!group) {
		group = {};
		records[data.source.groupId] = group;
	}
	let messages = group[member];
	if (messages && data.messages.text != messages[messages.length-1]) {
		messages.push(data.message.text);
		if (messages.length > config.get('ghost.limit'))
			messages.shift();
	} else {
		let messages = new Array();
		messages.push(data.message.text);
		group[member] = messages;
	}
	group['lastMessage'] = data.message.text;
	return;
};

module.exports.getMessages = async (data, member) => {
	try {
		var reply = records[data.source.groupId][member] || 'Member does not exist or last messages not recorded';
	} catch (error) {
		var reply = 'Member does not exist or last messages not recorded';
	}
	await lineMessageSender(data, reply);
	return;
};

module.exports.retrieveRecords = (data) => {
	records = data;
}

module.exports.getRecords = () => {
	return records;
};

