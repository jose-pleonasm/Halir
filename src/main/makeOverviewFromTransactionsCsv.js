import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeCsv } from './general/makeCsv.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<string>}
 */
export async function makeOverviewFromTransactionsCsv(lib, profile, config, csv) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', csv)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsCsv.name, value: csv });
	}

	const { lineSeparator, columnSeparator, numberScaleFactor, overviewColumns } = config;
	const columns = overviewColumns.split(columnSeparator);
	const hston = await csvToHston(lib, profile, config, csv);
	const overview = await makeOverview({ numberScaleFactor }, hston);
	return makeCsv({ lineSeparator, columnSeparator, columns }, overview);
}
