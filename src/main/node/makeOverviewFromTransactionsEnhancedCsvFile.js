import { makeOverviewFromTransactionsEnhancedCsv } from '../makeOverviewFromTransactionsEnhancedCsv.js';
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
export const makeOverviewFromTransactionsEnhancedCsvFile = createFileCover(async (csv, lib, profile, config) =>
	makeOverviewFromTransactionsEnhancedCsv(lib, profile, config, csv),
);
