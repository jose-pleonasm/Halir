import { promises as fs } from 'node:fs';
import { InvalidSetupError } from '../error/InvalidSetupError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @typedef {Object} FileCoverSetup
 * @property {Function} process
 * @property {Function?} transformOutput
 */

/**
 * @param {FileCoverSetup} setup
 */
export const createFileCover =
	({ process, transformOutput = (output) => output }) =>
	/**
	 * @param {Setup} setup
	 * @param {string} fileEncoding
	 * @param {string} inputFile
	 * @param {string} outputFile
	 * @returns {Promise<void>}
	 */
	async (setup, fileEncoding, inputFile, outputFile) => {
		if (!basicValueCheck('string', fileEncoding)) {
			throw new InvalidSetupError('fileEncoding');
		}
		if (!basicValueCheck('string', inputFile)) {
			throw new InvalidSetupError('inputFile');
		}
		if (!basicValueCheck('string', outputFile)) {
			throw new InvalidSetupError('outputFile');
		}

		const input = await fs.readFile(inputFile, { encoding: fileEncoding });
		const output = await process(setup, input);
		return fs.writeFile(outputFile, transformOutput(output));
	};
