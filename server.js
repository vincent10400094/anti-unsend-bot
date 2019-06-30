const config = require('config');

const linebotHelper = require('./utils/linebotHelper');
const services = require('./services');

const webhookPORT = process.env.PORT || config.get('project.webhook.PORT');

linebotHelper.listen('/linewebhook', webhookPORT, () => {
	console.info(`====== [WEBHOOK] line webhook server listening on port ${webhookPORT} ======`);
});

linebotHelper.on('message', async (event) => {
	console.log(event);
	if (event.message.text === 'man') {
		services.getManual(event);
		return;
	}
	if (event.message.text === config.get('ghost.keyword')) {
		services.lastMessage.getLastMessage(event);
		return;
	}
	services.lastMessage.update(event);
});
