const config = require('config');
const crypto = require('crypto');

const password = config.get('project.password');
const algorithm = 'aes-192-cbc';
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization vector.

module.exports.encrypt = (raw) => {
	let cipher = crypto.createCipheriv(algorithm, key, iv);
	let start = Date.now();
	let encrypted = cipher.update(raw, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	let end = Date.now();
	console.log(`[encryption] time elapsed: ${end-start}ms`);
	return encrypted;
};

module.exports.decrypt = (encrypted) => {
	let decipher = crypto.createDecipheriv(algorithm, key, iv);
	let start = Date.now();
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	let end = Date.now();
	console.log(`[decryption] time elapsed: ${end-start}ms`);
	return decrypted;
};
