import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

export default class ExpressError extends Error {
	httpCode;
	constructor(message, httpCode = HTTP_CODE_SERVER_ERROR) {
		super(message);
		this.httpCode = httpCode;
	}
}