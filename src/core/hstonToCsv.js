import { checkConfig } from './common.js';
import { makeCsv } from './makeCsv.js';
import { InvalidHstonError } from '../error/InvalidHstonError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {HSTON} hston
 * @param {Config} config
 */
async function transform(hston, { lineSeparator, columnSeparator, outputColumnSeparator, outputLocales, outputColumns }) {
	const transformNumber = (value) => {
		return value === null ? '' : value.toLocaleString(outputLocales);
	};

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

	return makeCsv({ columns, transformers, lineSeparator, columnSeparator: outputColumnSeparator }, hston, messages);
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
