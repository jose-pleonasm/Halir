import { makeOverviewFromTransactions } from '../makeOverviewFromTransactions.js';
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
export const makeOverviewFromTransactionsFile = createFileCover(async (csv, lib, profile, config) =>
	JSON.stringify(await makeOverviewFromTransactions(lib, profile, config, csv)),
);
