import Validator from 'fastest-validator';

export default new Validator();

export const checkWrapper = checkFunction => {
	return data => {
		const result = checkFunction(data);
		return !Array.isArray(result);
	};
};