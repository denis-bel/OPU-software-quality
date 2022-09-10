import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

export default (error, req, res, next) => {
	const { message, status } = error;
	res.status(getStatus(status)).json({ message: getMessage(message) });
	next();
}

function getStatus(status) {
	return status || HTTP_CODE_SERVER_ERROR;
}

function getMessage(message) {
	return message || 'Internal server error';
}