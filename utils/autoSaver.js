const fs = require('fs').promises;
const colors = require('colors');
const config = require('config');
const path = require('path');
const fetch = require('node-fetch');

var getRecords = require('../services/getMemberLastMessages').getRecords;
var appDir = path.dirname(require.main.filename);
const filePath = path.join(appDir, config.get('ghost.path'));
const encoding = config.get('ghost.encoding');
const url = config.get('ghost.autoSaveUrl');

module.exports.save = async () => {
	let data = JSON.stringify(getRecords());
	try {
		await fetch(url, {
			method: 'POST',
			body: data
		});
		console.log(colors.grey('[auto saving]'), `records saved to ${url}`);
	} catch (error) {
		console.error(colors.red('[auto saving]'), error);
	}
};

module.exports.retrieve = async () => {
	try {
		let response = await fetch(url);
		let data = await response.json();
		console.log(colors.white('[retrive data]'), 'success');
		return data;
	} catch (error) {
		console.error(colors.red('[retrieve data]'), error);
		return {};
	}
}