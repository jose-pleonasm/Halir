import { csvToHston } from './csvToHston.js';
import { createFileCover } from '../helpers/fileCover.js';

/**
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const csvToHstonFile = createFileCover(async (input, setup) => JSON.stringify(await csvToHston(setup, input)));
