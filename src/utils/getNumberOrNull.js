/**
 * @param {string | null} value
 * @returns {number | null}
 */
export function getNumberOrNull(value) {
	return value != null && value !== '' ? parseFloat(value) : null; // TODO: co delat s NaN?
}
