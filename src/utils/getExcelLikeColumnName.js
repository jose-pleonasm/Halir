import { InvalidInternalParamError } from '../error/InvalidInternalParamError.js';

function getCharByPosition(position) {
	if (position < 1 || position > 26) {
		throw new InvalidInternalParamError('position', {
			cause: 'Position must be between 1 and 26.',
			source: getCharByPosition.name,
			value: position,
		});
	}

	return String.fromCharCode(96 + position); // 'a' is 97 in ASCII
}

/**
 * @param {string[]} header
 * @param {string} value
 * @returns {string}
 */
export function getExcelLikeColumnName(header, value) {
	const columnIndex = header.findIndex((item) => item === value);
	return getCharByPosition(columnIndex + 1).toUpperCase();
}
