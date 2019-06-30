const config = require('config');

const linebotHelper = require('./utils/linebotHelper');
const PORT = process.env.PORT || config.get('project.webhook.PORT');

linebotHelper.listen('/linewebhook', PORT, () => {
	console.info(`====== [WEBHOOK] line webhook server listening on port ${PORT} ======`);
});
