import validator, { checkWrapper } from '@lib/validator';

const registerSchema = {
	login: 'string',
	password: 'string'
};

export default checkWrapper(validator.compile(registerSchema))

