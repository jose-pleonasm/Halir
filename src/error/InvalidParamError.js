import { CommonTypeError } from './CommonTypeError.js';

export class InvalidParamError extends CommonTypeError {
	/**
	 * @param {string} paramName
	 * @param {(CustomErrorOptions | string)?} options
	 * @param {string?} fileName
	 * @param {string?} lineNumber
	 */
	constructor(paramName, options, fileName, lineNumber) {
		super(`Invalid parameter "${paramName}".`, options, fileName, lineNumber);

		/** @type {string} */
		this.paramName = paramName;
	}
}
