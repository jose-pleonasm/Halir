import { promises as fs } from 'node:fs';
import { InvalidSetupError } from './error/InvalidSetupError.js';

export const SUPPORTED_PROFILES = ['degiro'];

const validateSetup = (setup) => {
	const { profile, inputFile, outputFile, getConfig } = setup;
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
	}
	if (typeof inputFile !== 'string') {
		throw new InvalidSetupError('inputFile');
	}
	if (typeof outputFile !== 'string') {
		throw new InvalidSetupError('outputFile');
	}
	if (typeof getConfig !== 'function') {
		throw new InvalidSetupError('getConfig');
	}
};

const validateConfig = (config) => {
	// TODO
};

/**
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const main = async (setup) => {
	validateSetup(setup);
	const { profile, inputFile, outputFile, getConfig } = setup;

	const config = await getConfig();
	validateConfig(config);
	const { fileEncoding, lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const input = await fs.readFile(inputFile, { encoding: fileEncoding });
	const module = await import(`./modules/${profile}/index.js`);

	const hston = await module.transform(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });
	return fs.writeFile(outputFile, JSON.stringify(hston));
};
