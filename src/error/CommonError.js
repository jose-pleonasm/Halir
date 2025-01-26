/**
 * @typedef {Object} ErrorOptions
 * @property {(Error | string)?} cause
 */

export class CommonError extends Error {
	/**
	 * @param {string} message
	 * @param {(ErrorOptions | string)?} options
	 * @param {string?} fileName
	 * @param {string?} lineNumber
	 */
	constructor(message, options, fileName, lineNumber) {
		const hasOptions = typeof options !== 'string';
		super(message, hasOptions ? options : fileName, hasOptions ? fileName : lineNumber, lineNumber);
	}
}
