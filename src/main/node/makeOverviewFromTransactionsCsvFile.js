import { makeOverviewFromTransactionsCsv } from '../makeOverviewFromTransactionsCsv.js';
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
export const makeOverviewFromTransactionsCsvFile = createFileCover(async (csv, lib, profile, config) =>
	makeOverviewFromTransactionsCsv(lib, profile, config, csv),
);
