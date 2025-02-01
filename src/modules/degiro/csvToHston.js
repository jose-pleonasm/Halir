import { v5 } from 'uuid';
import { createSimpleParser } from '../../utils/simpleParser.js';
import { getDateValue } from '../../utils/getDateValue.js';
import { hasRowValues } from '../../utils/hasRowValues.js';
import { getNumberOrNull } from '../../utils/getNumberOrNull.js';

/**
 * @param {Row} row
 * @returns {string}
 */
function getAction(row) {
	const quantity = getNumberOrNull(row[6]);
	if (quantity === null) {
		return ''; // ?
	}
	if (isNaN(quantity)) {
		return '[ERROR]';
	}

	return quantity > 0 ? 'buy' : 'sell'; // TODO: lepsi detekci + pridat akce (jako "Split Adjustment")
}

/**
 * @param {string} input
 * @param {Object} options
 * @returns {Row[]}
 */
function parse(input, options) {
	const { lineSeparator, columnSeparator } = options;
	const makeRows = createSimpleParser(lineSeparator);
	const makeCells = createSimpleParser(columnSeparator);
	const [_head, ...rawRows] = makeRows(input);
	const rows = rawRows.map(makeCells);
	return rows.filter(hasRowValues);
}

const createTransformer = ({ uuidNamespace, timezone, dateFormat }) =>
	/**
	 * @param {Row} row
	 * @returns {HSTONItem}
	 */
	function transformer(row) {
		const id = v5(row.join(''), uuidNamespace);

		return {
			id,
			action: getAction(row),
			datetime: new Date(getDateValue({ timezone, dateFormat }, row[0], row[1])).toISOString(),
			product: row[2],
			isin: row[3],
			exchangeReference: row[4],
			venue: row[5],
			quantity: getNumberOrNull(row[6]),
			price: getNumberOrNull(row[7]),
			priceCurrency: row[8],
			localValue: getNumberOrNull(row[9]),
			localValueCurrency: row[10],
			value: getNumberOrNull(row[11]),
			valueCurrency: row[12],
			exchangeRate: getNumberOrNull(row[13]),
			fees: getNumberOrNull(row[14]),
			feesCurrency: row[15],
			total: getNumberOrNull(row[16]),
			totalCurrency: row[17],
			orderId: row[18],
		};
	};

/**
 * @param {Row[]} rows
 * @param {Object} options
 * @returns {HSTON}
 */
function makeHston(rows, options) {
	const transform = createTransformer(options);
	return rows.map(transform);
}

/**
 * @param {string} input
 * @param {Object} options
 * @returns {HSTON}
 */
export const csvToHston = async (input, options) => {
	const rows = parse(input, options);
	return makeHston(rows, options).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
};
