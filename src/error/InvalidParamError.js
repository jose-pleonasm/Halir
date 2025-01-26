import { CommonError } from './CommonError.js';

export class InvalidParamError extends CommonError {
	constructor(paramName, options, fileName, lineNumber) {
		super(`Invalid parameter "${paramName}".`, options, fileName, lineNumber);

		this.paramName = paramName;
	}
}
