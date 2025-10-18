import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
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

	const { lineSeparator, columnSeparator, overviewColumns, outputColumnSeparator } = config;
	const columns = overviewColumns.split(columnSeparator);
	return makeCsv({ lineSeparator, columnSeparator: outputColumnSeparator || columnSeparator, columns }, overview);
}
