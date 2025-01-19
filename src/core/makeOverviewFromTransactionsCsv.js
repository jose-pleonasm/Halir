import { checkProfile, checkConfig } from './common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeCsv } from './makeCsv.js';
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
		throw new InvalidInputError();
	}

	const { lineSeparator, columnSeparator } = config;
	const columns = ['isin', 'product', 'quantity', 'totalLocalValue', 'totalValue', 'totalFees', 'total'];
	const hston = await csvToHston(profile, config, input);
	const overview = await makeOverview(hston);
	return makeCsv({ lineSeparator, columnSeparator, columns }, overview);
}
