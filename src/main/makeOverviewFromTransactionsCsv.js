import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { _makeOverviewFromTransactions } from './makeOverviewFromTransactions.js';
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

	const overview = await _makeOverviewFromTransactions(lib, profile, config, csv);

	const { lineSeparator, columnSeparator, overviewColumns } = config;
	const columns = overviewColumns.split(columnSeparator);
	return makeCsv({ lineSeparator, columnSeparator, columns }, overview);
}
