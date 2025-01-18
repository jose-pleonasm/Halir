/**
 * @param {string} separator
 * @returns {Function} (input: string) => string[]
 */
export const createSimpleParser = (separator) =>
	/**
	 * @param {string} input
	 * @returns {string[]}
	 */
	function simpleParser(input) {
		return input.split(separator);
	};
