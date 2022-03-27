import User from '@classes/dbModels/User';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_CREATED } from '@constants/httpCode';
import isRegisterDataValid from '@lib/validator/checkers/register';
import { USER_ROLE_USER } from '@constants/User';
import middlewareWrapper from '@lib/middlewareWrapper';


async function validateData(req, res, next) {
	const { login, password } = req.body;
	if (isRegisterDataValid({ login, password })) {
		next();
	} else {
		res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Invalid login or password'
		});
	}
}

async function checkIfUserExist(req, res, next) {
	const { login } = req.body;
	const user = await User.findOne({
		where: {
			login
		}
	});
	if (user) {
		res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'User with this login already exists'
		});
	} else {
		next();
	}
}

async function createUser(req, res) {
	const { login, password } = req.body;
	const user = await User.create({
		login,
		password,
		role: USER_ROLE_USER
	});
	res.status(HTTP_CODE_CREATED).json({
		message: 'User created',
		login: user.login,
		role: user.role
	});
}

export default [
	validateData,
	middlewareWrapper(checkIfUserExist),
	middlewareWrapper(createUser)
];
