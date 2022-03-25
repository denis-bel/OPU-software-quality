import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

export default (error, req, res, next) => {
	let { message, status } = error;
	if (!status) {
		status = HTTP_CODE_SERVER_ERROR;
		message = 'Internal server error';
	}
	res.status(status).json({ message });
	next();
}