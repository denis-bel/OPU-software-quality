import validator, { checkWrapper } from '@lib/validator';

const loginSchema = {
	login: 'string',
	password: 'string'
};

export default checkWrapper(validator.compile(loginSchema))

