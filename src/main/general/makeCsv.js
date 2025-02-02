import { InvalidParamError } from '../../error/InvalidParamError.js';
import { basicValueCheck } from '../../utils/basicValueCheck.js';
import { makeTableData } from '../../utils/makeTableData.js';

/**
 * @typedef {Object.<string, Object.<string, any>>} TransformerMap
 */

/**
 * @typedef {Object.<string, Function | TransformerMap>} Transformers
 */

/**
 * @typedef {Object} Options
 * @property {string} lineSeparator
 * @property {string} columnSeparator
 * @property {string[]} columns
 * @property {Transformers?} transformers
 * @param {Object.<string, string>?} titleMap
 */

/**
 *
 * @param {Options} options
 * @param {Object.<string, string | number | null>[]} entries
 */
export function makeCsv({ lineSeparator, columnSeparator, columns, transformers, titleMap }, entries) {
	if (!basicValueCheck('string', lineSeparator)) {
		throw new InvalidParamError('options.lineSeparator', { source: makeCsv.name, value: lineSeparator });
	}
	if (!basicValueCheck('string', columnSeparator)) {
		throw new InvalidParamError('options.columnSeparator', { source: makeCsv.name, value: columnSeparator });
	}
	if (!Array.isArray(columns)) {
		throw new InvalidParamError('options.columns', { source: makeCsv.name, value: columns });
	}
	if (!Array.isArray(entries)) {
		throw new InvalidParamError('options.entries', { source: makeCsv.name, value: entries });
	}

	const tableData = makeTableData({ columns, transformers, titleMap }, entries);
	return tableData.map((row) => row.join(columnSeparator)).join(lineSeparator);
}
