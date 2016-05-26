
const toURL = (str) => {
	return str.toLowerCase().replace(/\s/g, '_').replace(/\W/g, '');
};

export {
	toURL
};
