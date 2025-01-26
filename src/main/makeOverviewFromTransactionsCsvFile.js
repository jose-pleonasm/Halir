import { makeOverviewFromTransactionsCsv } from './makeOverviewFromTransactionsCsv.js';
import { createFileCover } from '../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Profile} profile
 * @param {Config} config
 * @returns {Promise<void>}
 */
export const makeOverviewFromTransactionsCsvFile = createFileCover(async (input, profile, config) =>
	makeOverviewFromTransactionsCsv(profile, config, input),
);
