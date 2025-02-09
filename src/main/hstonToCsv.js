import { checkConfig } from '../utils/common.js';
import { makeCsv } from './general/makeCsv.js';
import { InvalidHstonError } from '../error/InvalidHstonError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Config} config
 * @param {HSTON} hston
 */
async function transform({ lineSeparator, columnSeparator, outputColumnSeparator, outputLocales, outputColumns }, hston) {
	const transformNumber = (value) => {
		return value === null ? '' : value.toLocaleString(outputLocales);
	};

	// TODO: mozna dat jako soucast configu
	const messages = (
		await import(`../i18n/${outputLocales}.json`, {
			with: { type: 'json' },
		})
	).default;
	const columns = outputColumns.split(columnSeparator);
	const transformers = {
		date: (_, entry) => {
			const date = entry['datetime'];
			return new Date(date).toLocaleDateString(outputLocales);
		},
		time: (_, entry) => {
			const time = entry['datetime'];
			return new Date(time).toLocaleTimeString(outputLocales);
		},
		datetime: (datetime) => {
			return new Date(datetime).toLocaleString(outputLocales);
		},
		quantity: transformNumber,
		price: transformNumber,
		localValue: transformNumber,
		value: transformNumber,
		exchangeRate: transformNumber,
		fees: transformNumber,
		total: transformNumber,
	};

	return makeCsv({ columns, transformers, lineSeparator, columnSeparator: outputColumnSeparator, titleMap: messages }, hston);
}

/**
 * @param {Config} config
 * @param {HSTON} hston
 * @returns {Promise<string>}
 */
export async function hstonToCsv(config, hston) {
	checkConfig(config);
	if (!basicValueCheck('object', hston)) {
		throw new InvalidHstonError('', { source: hstonToCsv.name, value: hston });
	}

	const { lineSeparator, outputColumnSeparator, columnSeparator, outputLocales, outputColumns, columns } = config;

	return transform(
		{
			lineSeparator,
			columnSeparator,
			outputLocales,
			outputColumnSeparator: outputColumnSeparator || columnSeparator,
			outputColumns: outputColumns || columns,
		},
		hston,
	);
}
