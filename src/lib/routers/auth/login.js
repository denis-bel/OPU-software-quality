import User from '@classes/dbModels/User';
import { HTTP_CODE_FORBIDDEN } from '@constants/httpCode';
import ExpressError from '@classes/ExpressError';

export default async function login(req, res, next) {
	const { login } = req.body;
	const user = await User.findOne({
		where: {
			login
		}
	});
	if (!user) {
		return next(new ExpressError('Forbidden', HTTP_CODE_FORBIDDEN));
	}
	const { password } = req.body;
	const passwordValid = await User.isPasswordValid(password, user.password);
	if (passwordValid) {
		const token = await User.generateToken({ login: user.login });
		return res.json({ token });
	}
	return next(new ExpressError('Forbidden', HTTP_CODE_FORBIDDEN));
	
}
