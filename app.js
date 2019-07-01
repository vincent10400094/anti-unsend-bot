const config = require('config');

const linebotHelper = require('./utils/linebotHelper');
const memberProfileHelper = require('./utils/memberProfileHelper');
const services = require('./services');

const webhookPORT = process.env.PORT || config.get('project.webhook.PORT');
const keyword = config.get('ghost.keyword');

linebotHelper.listen('/linewebhook', webhookPORT, () => {
	console.info(`====== [WEBHOOK] line webhook server listening on port ${webhookPORT} ======`);
});

const gettingMember = new RegExp(`${keyword} +@[^ \n]+`);
const getMemberName = new RegExp(`(?<=${keyword} +@)[^ \n]+`);

linebotHelper.on('message', async (event) => {
	var profile = await memberProfileHelper(event);
	console.log(`incoming message '${event.message.text}' from ${profile.displayName}`);
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
			console.log(`get member ${member}'s last messages`);
			services.getMemberLastMessages.getMessages(event, member);
			return;
		}
		services.getMemberLastMessages.updateMessages(event, profile.displayName);
	}
});