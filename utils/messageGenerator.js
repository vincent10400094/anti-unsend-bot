const config = require('config');

function getManual() {
	return `${config.get('ghost.keyword')} [member [number]]`;
}

module.exports.getManual = getManual;