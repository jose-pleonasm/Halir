/**
 * @param {string | null} value
 * @returns {number | null}
 */
export function getNumberOrNull(value) {
	// TODO: co delat s NaN?
	if (value == null || value === '') {
		return null;
	}

	const sanitizedValue = typeof value === 'string' ? value.replace(',', '.').replaceAll('"', '') : value;
	return parseFloat(sanitizedValue);
}
