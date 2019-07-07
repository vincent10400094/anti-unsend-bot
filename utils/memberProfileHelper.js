const colors = require('colors');

module.exports = async (data) => {
	try {
		return await data.source.profile();
	} catch (error) {
		console.log(colors.red('[Profile]'), 'error getting member profile', error);
	}
};