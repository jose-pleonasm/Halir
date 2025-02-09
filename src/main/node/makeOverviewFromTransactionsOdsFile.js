import { makeOverviewFromTransactionsOds } from '../makeOverviewFromTransactionsOds.js';
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
export const makeOverviewFromTransactionsOdsFile = createFileCover(async (csv, lib, profile, config) =>
	makeOverviewFromTransactionsOds(lib, profile, config, csv),
);
