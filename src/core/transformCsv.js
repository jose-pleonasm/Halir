import { csvToHston } from './csvToHston.js';
import { hstonToCsv } from './hstonToCsv.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<string>}
 */
export const transformCsv = async (profile, config, input) => {
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError();
	}

	const hston = await csvToHston(profile, config, input);
	return hstonToCsv(config, hston);
};
