import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * Creates HSOON from HSTON compatible CSV
 *
 * @private
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<HSOON>}
 */
export async function _makeOverviewFromTransactions(lib, profile, config, csv) {
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

	return _makeOverviewFromTransactions(lib, profile, config, csv);
}
