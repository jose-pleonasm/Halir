/**
 * @param {Row} row
 * @returns {boolean}
 */
export function hasRowValues(row) {
	return !!row.filter((cells) => cells.length).length;
}
