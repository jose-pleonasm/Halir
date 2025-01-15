import { InvalidSetupError } from '../error/InvalidSetupError.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

export const SUPPORTED_PROFILES = ['degiro'];

const checkSetup = (setup) => {
	const { profile, config } = setup;
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
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
 * @param {string} input
 * @returns {Promise<HSTON>}
 */
export const csvToHston = async (setup, input) => {
	checkSetup(setup);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError();
	}

	const { profile, config } = setup;
	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat } = config;

	const module = await import(`../modules/${profile}/index.js`);
	return module.csvToHston(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });
};
