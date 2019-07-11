module.exports = {
	project: {
		webhook: {
			PORT: 8080
		}
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
		path: 'records.json',
		autoSaveUrl: 'http://linux5.csie.ntu.edu.tw:8787',
		encoding: 'utf-8'
	}
};