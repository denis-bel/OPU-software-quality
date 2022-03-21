import User from '@classes/dbModels/User';
import { HTTP_CODE_FORBIDDEN } from '@constants/httpCode';
import ExpressError from '@classes/ExpressError';

export default async (req, res, next) => {
	const { login } = req.body;
	const user = await User.findOne({
		where: {
			login
		}
	});
	if (!user) {
		return next(new ExpressError('Invalid login or password', HTTP_CODE_FORBIDDEN));
	}
	const { password } = req.body;
	const passwordValid = await User.isPasswordValid(password, user.password);
	if (passwordValid) {
		const token = await User.generateToken({ login: user.login });
		return res.json({ token });
	}
	return next(new ExpressError('Invalid login or password', HTTP_CODE_FORBIDDEN));
	
}
