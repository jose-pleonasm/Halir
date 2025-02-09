import { transformCsv } from '../transformCsv.js';
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
export const transformCsvFile = createFileCover(async (input, lib, profile, config) => transformCsv(lib, profile, config, input));
