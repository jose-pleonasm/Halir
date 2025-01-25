/**
 * @param {number} scaleFactor
 * @param {number} v1
 * @param {number} v2
 * @returns {number}
 */
export function add(scaleFactor, v1, v2) {
	return (v1 * scaleFactor + v2 * scaleFactor) / scaleFactor;
}
