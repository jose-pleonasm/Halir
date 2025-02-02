export class CommonTypeError extends TypeError {
	/**
	 * @param {string} message
	 * @param {(CustomErrorOptions | string)?} options
	 * @param {string?} fileName
	 * @param {string?} lineNumber
	 */
	constructor(message, options, fileName, lineNumber) {
		const hasOptions = !!options && typeof options !== 'string';
		super(message, hasOptions ? options : fileName, hasOptions ? fileName : lineNumber, lineNumber);

		/** @type {string | null} */
		this.source = hasOptions ? options.source : null;

		if (hasOptions && 'value' in options) {
			/** @type {*} */
			this.value = options.value;
		}
	}
}
