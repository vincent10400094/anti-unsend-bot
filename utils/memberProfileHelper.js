module.exports = async (data) => {
	try {
		let profile = await data.source.profile();
		return profile;
	} catch (error) {
		console.log('[getMemberProfile] error getting member profile', error);
	}
};