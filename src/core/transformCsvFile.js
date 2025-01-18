import { transformCsv } from './transformCsv.js';
import { createFileCover } from '../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Profile} profile
 * @param {Config} config
 * @returns {Promise<void>}
 */
export const transformCsvFile = createFileCover(async (input, profile, config) => transformCsv(profile, config, input));
