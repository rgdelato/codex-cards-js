
const toURL = (str) => {
	return str.toLowerCase().replace(/\s/g, '_').replace(/\W/g, '');
};

module.exports = {
	toURL
};
