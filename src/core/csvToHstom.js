import { promises as fs } from 'node:fs';
import { InvalidSetupError } from '../error/InvalidSetupError.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

export const SUPPORTED_PROFILES = ['degiro'];

const checkSetup = (setup) => {
	const { profile, inputFile, outputFile, config } = setup;
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
	}
	if (!basicValueCheck('string', inputFile)) {
		throw new InvalidSetupError('inputFile');
	}
	if (!basicValueCheck('string', outputFile)) {
		throw new InvalidSetupError('outputFile');
	}
	if (!basicValueCheck('object', config)) {
		throw new InvalidSetupError('config');
	}

	checkConfig(config);
};

const checkConfig = (config) => {
	const { uuidNamespace, lineSeparator, columnSeparator, timezone, dateFormat } = config;
	if (!basicValueCheck('string', uuidNamespace)) {
		throw new InvalidSetupError('config.uuidNamespace');
	}
	if (!basicValueCheck('string', lineSeparator)) {
		throw new InvalidSetupError('config.lineSeparator');
	}
	if (!basicValueCheck('string', columnSeparator)) {
		throw new InvalidSetupError('config.columnSeparator');
	}
	if (!basicValueCheck('string', timezone)) {
		throw new InvalidSetupError('config.timezone');
	}
	if (!basicValueCheck('string', dateFormat)) {
		throw new InvalidSetupError('config.dateFormat');
	}
};

/**
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const csvToHstom = async (setup) => {
	checkSetup(setup);
	const { profile, inputFile, outputFile, config } = setup;
	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat, fileEncoding } = config;

	const input = await fs.readFile(inputFile, { encoding: fileEncoding });
	if (!input) {
		throw new InvalidInputError(inputFile);
	}

	const module = await import(`../modules/${profile}/index.js`);
	const hston = await module.csvToHstom(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });

	return fs.writeFile(outputFile, JSON.stringify(hston));
};
