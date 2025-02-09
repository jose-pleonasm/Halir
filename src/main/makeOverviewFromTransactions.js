import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeCsv } from './general/makeCsv.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @private
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<HSOON>}
 */
export async function makeOverviewFromTransactionsInternal(lib, profile, config, csv) {
	const { numberScaleFactor } = config;
	const hston = await csvToHston(lib, profile, config, csv);
	return makeOverview({ numberScaleFactor }, hston);
}

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<HSOON>}
 */
export async function makeOverviewFromTransactions(lib, profile, config, csv) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', csv)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactions.name, value: csv });
	}

	return makeOverviewFromTransactionsInternal(lib, profile, config, csv);
}
