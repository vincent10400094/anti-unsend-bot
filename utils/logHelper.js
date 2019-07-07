const colors = require('colors');

module.exports = (data, profile) => {
	let info = (data.source.type === 'user') ? colors.green('[user] ') : colors.cyan('[group]') ;
	let message = data.message.text || data.message.type;
	console.log(info, `'${message}' from ${profile.displayName}`);
	return;
}