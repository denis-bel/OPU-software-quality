export default object => {
	const keys = [];
	const values = [];
	for (const [key, value] of Object.entries(object)) {
		keys.push(key);
		values.push(value);
	}
	return { keys, values };
}