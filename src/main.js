import { promises as fs } from 'node:fs';
import { InvalidSetupError } from './error/InvalidSetupError.js';
import { InvalidInputError } from './error/InvalidInputError.js';

export const SUPPORTED_PROFILES = ['degiro'];

const validateSetup = (setup) => {
	const { profile, inputFile, outputFile, config } = setup;
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
	}
	if (typeof inputFile !== 'string' || !inputFile) {
		throw new InvalidSetupError('inputFile');
	}
	if (typeof outputFile !== 'string' || !outputFile) {
		throw new InvalidSetupError('outputFile');
	}
	if (typeof config !== 'object' || !config) {
		throw new InvalidSetupError('config');
	}

	validateConfig(config);
};

const validateConfig = (config) => {
	const { uuidNamespace } = config;
	if (typeof uuidNamespace !== 'string' || !uuidNamespace) {
		throw new InvalidSetupError('config.uuidNamespace');
	}
	// TODO
};

/**
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const main = async (setup) => {
	validateSetup(setup);
	const { profile, inputFile, outputFile, config } = setup;
	const { fileEncoding, lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const input = await fs.readFile(inputFile, { encoding: fileEncoding });
	if (!input) {
		throw new InvalidInputError(inputFile);
	}

	const { transform } = await import(`./modules/${profile}/index.js`);
	const hston = await transform(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });

	return fs.writeFile(outputFile, JSON.stringify(hston));
};
