import { checkConfig } from './common.js';
import { InvalidHstonError } from '../error/InvalidHstonError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {HSTON} hston
 * @param {Config} config
 */
async function transform(hston, { lineSeparator, columnSeparator, outputColumnSeparator, outputLocales, outputColumns }) {
	const messages =
		(
			await import(`../i18n/${outputLocales}.json`, {
				with: { type: 'json' },
			})
		).default || {};
	const columns = outputColumns.split(columnSeparator);
	const rows = hston.map((item) => {
		return columns.map((column) => {
			switch (column) {
				case 'date':
					const date = item['datetime'];
					return new Date(date).toLocaleDateString(outputLocales);

				case 'time':
					const time = item['datetime'];
					return new Date(time).toLocaleTimeString(outputLocales);

				case 'datetime':
					const datetime = item['datetime'];
					return new Date(datetime).toLocaleString(outputLocales);

				case 'quantity':
				case 'price':
				case 'localValue':
				case 'value':
				case 'exchangeRate':
				case 'fees':
				case 'total':
					const number = item[column];
					return number === null ? '' : number.toLocaleString(outputLocales);

				default:
					return item[column];
			}
		});
	});
	const rowsWithHead = [columns.map((column) => messages[column] || column), ...rows];

	return rowsWithHead.map((row) => row.join(outputColumnSeparator)).join(lineSeparator);
}

/**
 * @param {Config} config
 * @param {HSTON} hston
 * @returns {Promise<string>}
 */
export const hstonToCsv = async (config, hston) => {
	checkConfig(config);
	if (!basicValueCheck('object', hston)) {
		throw new InvalidHstonError();
	}

	const { lineSeparator, outputColumnSeparator, columnSeparator, outputLocales, outputColumns, columns } = config;

	return transform(hston, {
		lineSeparator,
		columnSeparator,
		outputLocales,
		outputColumnSeparator: outputColumnSeparator || columnSeparator,
		outputColumns: outputColumns || columns,
	});
};
