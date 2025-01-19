/**
 * @typedef {Object.<string, Object.<string, any>>} TransformerMap
 */

/**
 * @typedef {Object.<string, Function | TransformerMap>} Transformers
 */

/**
 * @typedef {Object} Options
 * @property {Transformers} transformers
 */

/**
 *
 * @param {Options} options
 * @param {Object.<string, string | number | null>[]} entries
 * @param {Object.<string, string>?} titleMap
 */
export function makeCsv({ lineSeparator, columnSeparator, columns, transformers }, entries, titleMap) {
	const rows = entries.map((entry) => {
		return columns.map((column) => {
			if (transformers[column] != null) {
				return typeof transformers[column] === 'function'
					? transformers[column](entry[column], entry)
					: transformers[column][entry[column]];
			}

			return entry[column];
		});
	});
	const rowsWithHeader = [columns.map((column) => titleMap?.[column] || column), ...rows];

	return rowsWithHeader.map((row) => row.join(columnSeparator)).join(lineSeparator);
}
