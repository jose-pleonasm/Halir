import { csvToHston } from './csvToHston.js';
import { createFileCover } from '../utils/fileCover.js';

/**
 * @param {Setup} setup
 * @param {string} fileEncoding
 * @param {string} inputFile
 * @param {string} outputFile
 * @returns {Promise<void>}
 */
export const csvToHstonFile = createFileCover({ process: csvToHston, transformOutput: JSON.stringify });
