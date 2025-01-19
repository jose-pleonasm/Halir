import { checkProfile, checkConfig } from './common.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<HSTON>}
 */
export async function csvToHston(profile, config, input) {
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError();
	}

	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const module = await import(`../modules/${profile}/index.js`);
	return module.csvToHston(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });
}
