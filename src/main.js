import { promises as fs } from 'node:fs';
import { InvalidSetupError } from './error/InvalidSetupError.js';
import { InvalidInputError } from './error/InvalidInputError.js';

export const SUPPORTED_PROFILES = ['degiro'];

function basicCheck(type, value) {
	return typeof value === type && !!value;
}

const validateSetup = (setup) => {
	const { profile, inputFile, outputFile, config } = setup;
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
	}
	if (!basicCheck('string', inputFile)) {
		throw new InvalidSetupError('inputFile');
	}
	if (!basicCheck('string', outputFile)) {
		throw new InvalidSetupError('outputFile');
	}
	if (!basicCheck('object', config)) {
		throw new InvalidSetupError('config');
	}

	validateConfig(config);
};

const validateConfig = (config) => {
	const { uuidNamespace, lineSeparator, columnSeparator, timezone, dateFormat } = config;
	if (!basicCheck('string', uuidNamespace)) {
		throw new InvalidSetupError('config.uuidNamespace');
	}
	if (!basicCheck('string', lineSeparator)) {
		throw new InvalidSetupError('config.lineSeparator');
	}
	if (!basicCheck('string', columnSeparator)) {
		throw new InvalidSetupError('config.columnSeparator');
	}
	if (!basicCheck('string', timezone)) {
		throw new InvalidSetupError('config.timezone');
	}
	if (!basicCheck('string', dateFormat)) {
		throw new InvalidSetupError('config.dateFormat');
	}
};

/**
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const main = async (setup) => {
	validateSetup(setup);
	const { profile, inputFile, outputFile, config } = setup;
	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat, fileEncoding } = config;

	const input = await fs.readFile(inputFile, { encoding: fileEncoding });
	if (!input) {
		throw new InvalidInputError(inputFile);
	}

	const { transform } = await import(`./modules/${profile}/index.js`);
	const hston = await transform(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });

	return fs.writeFile(outputFile, JSON.stringify(hston));
};
