export default class ExpressError extends Error {
	httpCode;
	constructor(message, httpCode) {
		super(message);
		this.httpCode = httpCode;
	}
}