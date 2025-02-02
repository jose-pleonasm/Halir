import { promises as fs } from 'node:fs';
import { InvalidParamError } from '../error/InvalidParamError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Function} process
 */
export const createFileCover =
	(process) =>
	/**
	 * @param {string} fileEncoding
	 * @param {string} inputFile
	 * @param {string} outputFile
	 * @param {any} args
	 * @returns {Promise<void>}
	 */
	async (fileEncoding, inputFile, outputFile, ...args) => {
		if (!basicValueCheck('string', fileEncoding)) {
			throw new InvalidParamError('fileEncoding', { source: 'fileCover', value: fileEncoding });
		}
		if (!basicValueCheck('string', inputFile)) {
			throw new InvalidParamError('inputFile', { source: 'fileCover', value: inputFile });
		}
		if (!basicValueCheck('string', outputFile)) {
			throw new InvalidParamError('outputFile', { source: 'fileCover', value: outputFile });
		}

		const input = await fs.readFile(inputFile, { encoding: fileEncoding });
		const output = await process(input, ...args);
		return fs.writeFile(outputFile, output);
	};
