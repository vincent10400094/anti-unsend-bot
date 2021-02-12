module.exports = {
	project: {
		webhook: {
			PORT: 8080
		},
		password: '<Your password>'
	},
	line: {
		channelId: '<Your channel ID>',
		channelSecret: '<Your channel secret>',
		channelAccessToken: '<Your channel access token>'
	},
	ghost: {
		keyword: '沙文',
		limit: 5,
		autoSave: true,
		autoSaveInterval: 1000 * 60 * 20,	// 20 minutes
		autoSaveUrl: 'http://linux5.csie.ntu.edu.tw:8787'
	}
};