import { v5 } from 'uuid';

/**
 * @private
 * @typedef {string[]} Row
 */

const makeParser = ({ separator }) =>
	function parser(input) {
		return input.split(separator);
	};

/**
 * @param {Row} row
 * @returns {boolean}
 */
function hasValues(row) {
	return !!row.filter((cells) => cells.length).length;
}

/**
 * @param {Row} row
 * @param {Object} options
 * @returns {string}
 */
function getDateValue(row, { timezone, dateFormat }) {
	const date =
		dateFormat === 'DD-MM-YYYY'
			? (() => {
					const [day, month, year] = row[0].split('-');
					return `${year}-${month}-${day}`;
				})()
			: row[0];
	return `${date} ${row[1]} ${timezone}`; // TODO: detekci casove zony podle obdobi
}

/**
 * @param {string | null} value
 * @returns {number | null}
 */
function getNumberOrNull(value) {
	return value != null && value !== '' ? parseFloat(value) : null; // TODO: co delat s NaN?
}

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
	const makeRows = makeParser({ separator: lineSeparator });
	const makeCells = makeParser({ separator: columnSeparator });
	const [_head, ...rawRows] = makeRows(input);
	const rows = rawRows.map(makeCells);
	return rows.filter(hasValues);
}

const makeTransformer = ({ uuidNamespace, timezone, dateFormat }) =>
	/**
	 * @param {Row} row
	 * @returns {HSTONItem}
	 */
	function transformer(row) {
		const id = v5(row.join(''), uuidNamespace);

		return {
			id,
			action: getAction(row),
			datetime: new Date(getDateValue(row, { timezone, dateFormat })).toISOString(),
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
	const transform = makeTransformer(options);
	return rows.map(transform);
}

/**
 * @param {string} input
 * @param {Object} options
 * @returns {HSTON}
 */
export const csvToHston = async (input, options) => {
	const rows = parse(input, options);
	return makeHston(rows, options);
};
