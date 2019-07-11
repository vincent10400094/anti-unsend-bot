module.exports = {
	project: {
		webhook: {
			PORT: 8080
		},
		password: '***REMOVED***'
	},
	line: {
		channelId: '***REMOVED***',
		channelSecret: '***REMOVED***',
		channelAccessToken: '***REMOVED***'
	},
	ghost: {
		keyword: '沙文',
		limit: 5,
		autoSave: true,
		autoSaveInterval: 1000*60*5,	// 5 minutes
		autoSaveUrl: 'http://linux5.csie.ntu.edu.tw:8787'
	}
};