module.exports = {
	project: {
		webhook: {
			PORT: 8080
		},
		frontEnd: {
			PORT: 3000
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
		autoSaveInterval: 1000*60,	// 1 minute
		path: 'records.json',
		encoding: 'utf-8'
	}
};