const colors = require('colors');
const config = require('config');
const fetch = require('node-fetch');
const encryptionHelper = require('./encryptionHelper');

const getRecords = require('../services/getMemberLastMessages').getRecords;
const url = config.get('ghost.autoSaveUrl');

module.exports.save = async () => {
	let data = JSON.stringify(getRecords());
	let encrypted = encryptionHelper.encrypt(data);
	try {
		await fetch(url, {
			method: 'POST',
			body: encrypted
		});
		console.log(colors.grey('[auto saving]'), `records saved to ${url}`);
	} catch (error) {
		console.error(colors.red('[auto saving]'), error);
	}
};

module.exports.retrieve = async () => {
	try {
		let response = await fetch(url);
		let encrypted = await response.text();
		let data = encryptionHelper.decrypt(encrypted);
		console.log(colors.white('[retrive data]'), 'success');
		return JSON.parse(data);
	} catch (error) {
		console.error(colors.red('[retrieve data]'), error);
		return {};
	}
}