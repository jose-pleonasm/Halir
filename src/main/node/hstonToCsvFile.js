import { hstonToCsv } from '../hstonToCsv.js';
import { createFileCover } from '../../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Config} config
 * @returns {Promise<void>}
 */
export const hstonToCsvFile = createFileCover(async (hston, config) => await hstonToCsv(config, JSON.parse(hston)));
