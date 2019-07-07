const config = require('config');
const colors = require('colors');

const linebotHelper = require('./utils/linebotHelper');
const memberProfileHelper = require('./utils/memberProfileHelper');
const logHelper = require('./utils/logHelper');
const autoSaver = require('./utils/autoSaver');
const services = require('./services');

const webhookPORT = process.env.PORT || config.get('project.webhook.PORT');
const frontEndPORT = process.env.PORT || config.get('project.frontEnd.PORT');
const keyword = config.get('ghost.keyword');

// setInterval(autoSaver.save, config.get('ghost.autoSaveInterval'));

linebotHelper.listen('/linewebhook', webhookPORT, async () => {
	console.info(`====== [WEBHOOK] line webhook server listening on port ${webhookPORT} ======`);
	let data = await autoSaver.retrieve() || {};
	services.getMemberLastMessages.retrieveRecords(data);	
});
// services.frontEnd.listen(frontEndPORT);

const gettingMember = new RegExp(`${keyword} +@[^ \n]+`);
const getMemberName = new RegExp(`(?<=${keyword} +@)[^ \n]+`);

linebotHelper.on('message', async (event) => {
	var profile = await memberProfileHelper(event);
	logHelper(event, profile);
	if (event.source.type === 'group' && event.message.type === 'text') {
		if (event.message.text === 'man') {
			services.getManual(event);
			return;
		}
		if (event.message.text === keyword) {
			services.getMemberLastMessages.getMessages(event, 'lastMessage');
			return;
		}
		var matchArray = event.message.text.match(gettingMember);
		if (matchArray) {
			var member = event.message.text.match(getMemberName)[0];
			console.log(colors.magenta('[ghost]'), `get member ${member}'s last messages`);
			services.getMemberLastMessages.getMessages(event, member);
			return;
		}
		services.getMemberLastMessages.updateMessages(event, profile.displayName);
	}
});