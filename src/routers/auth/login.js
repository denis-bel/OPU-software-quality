import User from '@classes/dbModels/User';
import { HTTP_CODE_FORBIDDEN } from '@constants/httpCode';
import isLoginDataValid from '@lib/validator/checkers/login';
import middlewareWrapper from '@lib/middlewareWrapper';
import UserLog from '@classes/dbModels/UserLog';

function validateLoginData(req, res, next) {
	const { login, password } = req.body;
	if (isLoginDataValid({ login, password })) {
		next();
	} else {
		res.status(HTTP_CODE_FORBIDDEN).json({
			message: 'Invalid login or password'
		});
	}
}

async function getUser(req, res, next) {
	const { login } = req.body;
	const user = await User.findOne({
		where: {
			login
		}
	});
	if (user) {
		req.user = user;
		next();
	} else {
		res.status(HTTP_CODE_FORBIDDEN).json({
			message: 'Invalid login or password'
		});
	}
}

async function generateToken(req, res) {
	const { user } = req;
	const { password: inputPassword } = req.body;
	const passwordValid = await User.isPasswordValid(inputPassword, user.password);
	if (passwordValid) {
		const token = await User.generateToken({ login: user.login });
		const { role, login } = user;
		await UserLog.create({ userId: user.id, action: 'Logged in' });
		res.json({ token, role, login });
	} else {
		res.status(HTTP_CODE_FORBIDDEN).json({
			message: 'Invalid login or password'
		});
	}
}

export default [validateLoginData, middlewareWrapper(getUser), middlewareWrapper(generateToken)];
