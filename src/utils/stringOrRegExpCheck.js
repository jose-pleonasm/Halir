import { basicValueCheck } from './basicValueCheck.js';

/**
 * @param {any} value
 * @returns {boolean}
 */
export function stringOrRegExpCheck(value) {
	return basicValueCheck('string', value) || value instanceof RegExp;
}
