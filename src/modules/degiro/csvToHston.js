import { createSimpleParser } from '../../utils/simpleParser.js';
import { getDateValue } from '../../utils/getDateValue.js';
import { hasRowValues } from '../../utils/hasRowValues.js';
import { getNumberOrNull } from '../../utils/getNumberOrNull.js';

/**
 * @param {HSTONItem} item
 * @returns {string}
 */
function getNote(item) {
	const { venue, price, fees, total } = item;

	if (venue === '' && fees === null && total === 0) {
		return 'Spinoff';
	}

	if (venue === '' && fees === null && price !== 0) {
		return 'Split Adjustment';
	}

	return '';
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

	return quantity > 0 ? 'buy' : 'sell'; // TODO: better detection
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

const createTransformer = ({ uuidV5 }, { uuidNamespace, timezone, dateFormat }) =>
	/**
	 * Note: Keeping the currency as is it.
	 * @param {Row} row
	 * @returns {Promise<HSTONItem>}
	 */
	async function transformer(row) {
		const id = await uuidV5(row.join(''), uuidNamespace);

		// TODO: udelat to lepe
		const hv14729eb4c430850b9929b3d15b054a673 = (row) => ({
			id,
			action: getAction(row),
			datetime: new Date(getDateValue({ timezone, dateFormat }, row[0], row[1])).toISOString(),
			product: row[2],
			isin: row[3],
			referenceExchange: row[4],
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
		});
		const hv17128931846c45cbfa4d51e08b671500c = (row) => ({
			id,
			action: getAction(row),
			datetime: new Date(getDateValue({ timezone, dateFormat }, row[0], row[1])).toISOString(),
			product: row[2],
			isin: row[3],
			referenceExchange: row[4],
			venue: row[5],
			quantity: getNumberOrNull(row[6]),
			price: getNumberOrNull(row[7]),
			priceCurrency: row[8],
			localValue: getNumberOrNull(row[9]),
			localValueCurrency: row[10],
			value: getNumberOrNull(row[11]),
			valueCurrency: 'EUR',
			exchangeRate: getNumberOrNull(row[12]),
			fees: getNumberOrNull(row[14]),
			feesCurrency: 'EUR',
			total: getNumberOrNull(row[15]),
			totalCurrency: 'EUR',
			orderId: row[17],
		});

		const item = (row.length === 19 ? hv14729eb4c430850b9929b3d15b054a673 : hv17128931846c45cbfa4d51e08b671500c)(row);
		return {
			...item,
			note: getNote(item),
		};
	};

/**
 * @param {Library} lib
 * @param {Row[]} rows
 * @param {Object} options
 * @returns {Promise<HSTON>}
 */
async function makeHston(lib, rows, options) {
	const transform = createTransformer(lib, options);
	return (await Promise.all(rows.map(transform))).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
}

/**
 * @param {Library} lib
 * @param {string} csv
 * @param {Object} options
 * @returns {HSTON}
 */
export async function csvToHston(lib, csv, options) {
	const rows = parse(csv, options);
	return makeHston(lib, rows, options);
}
