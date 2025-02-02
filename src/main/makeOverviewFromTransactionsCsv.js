import { checkProfile, checkConfig } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeCsv } from './general/makeCsv.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<string>}
 */
export async function makeOverviewFromTransactionsCsv(profile, config, input) {
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsCsv.name, value: input });
	}

	const { lineSeparator, columnSeparator, numberScaleFactor } = config;
	const columns = [
		'isin',
		'product',
		'quantity',
		'totalLocalValue',
		'totalLocalValueCurrency',
		'totalValue',
		'totalValueCurrency',
		'totalFees',
		'totalFeesCurrency',
		'total',
		'totalCurrency',
	];
	const hston = await csvToHston(profile, config, input);
	const overview = await makeOverview({ numberScaleFactor }, hston);
	return makeCsv({ lineSeparator, columnSeparator, columns }, overview);
}
