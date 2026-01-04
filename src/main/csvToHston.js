import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/*
	Obal /modules/{profile}/csvToHston pro veřejné použití
*/
/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<HSTON>}
 */
export async function csvToHston(lib, profile, config, csv) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', csv)) {
		throw new InvalidInputError('', { source: csvToHston.name, value: csv });
	}

	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const module = await import(`../modules/${profile}/index.js`);
	return module.csvToHston(lib, csv, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });
}
