import { csvToHston } from '../csvToHston.js';
import { createFileCover } from '../../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @returns {Promise<void>}
 */
export const csvToHstonFile = createFileCover(async (input, lib, profile, config) =>
	JSON.stringify(await csvToHston(lib, profile, config, input)),
);
