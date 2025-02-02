import { makeOverviewFromTransactionsOds } from './makeOverviewFromTransactionsOds.js';
import { createFileCover } from '../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Profile} profile
 * @param {Config} config
 * @returns {Promise<void>}
 */
export const makeOverviewFromTransactionsOdsFile = createFileCover(async (input, profile, config) =>
	makeOverviewFromTransactionsOds(profile, config, input),
);
