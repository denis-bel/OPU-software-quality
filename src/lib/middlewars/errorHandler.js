import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
	const { message, httpCode = HTTP_CODE_SERVER_ERROR } = error;
	return res.status(httpCode).json(message);
}