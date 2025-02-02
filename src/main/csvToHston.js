import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<HSTON>}
 */
export async function csvToHston(lib, profile, config, input) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError('', { source: csvToHston.name, value: input });
	}

	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const module = await import(`../modules/${profile}/index.js`);
	return module.csvToHston(lib, input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });
}
