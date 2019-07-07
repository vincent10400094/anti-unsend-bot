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
		autoSaveInterval: 1000*60,	// 1 minute
		path: 'records.json',
		encoding: 'utf-8'
	}
};