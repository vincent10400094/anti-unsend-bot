const fs = require('fs').promises;
const colors = require('colors');
const config = require('config');
const path = require('path');

var getRecords = require('../services/getMemberLastMessages').getRecords;
var appDir = path.dirname(require.main.filename);
const filePath = path.join(appDir, config.get('ghost.path'));
const encoding = config.get('ghost.encoding')

module.exports.save = async () => {
	let data = JSON.stringify(getRecords());
	try {
		await fs.writeFile(filePath, data, encoding);
		console.log(colors.grey('[auto saving]'), `records saved to ${filePath}`);
	} catch (error) {
		console.error(colors.red('[auto saving]'), error);
	}
};

module.exports.retrieve = async () => {
	try {
		let data = await fs.readFile(filePath, encoding);
		console.log(colors.white('[retrive data]'), 'success');
		return JSON.parse(data);
	} catch (error) {
		console.error(colors.red('[retrieve data]'), error);
		return {};
	}
}