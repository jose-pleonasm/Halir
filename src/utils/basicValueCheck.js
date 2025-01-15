/**
 * @param {'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' |' undefined'} type
 * @param {any} value
 * @returns {boolean}
 */
export function basicValueCheck(type, value) {
	return typeof value === type && !!value;
}
