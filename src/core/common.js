import { InvalidSetupError } from '../error/InvalidSetupError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

export const SUPPORTED_PROFILES = ['degiro'];

export const checkProfile = (profile) => {
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidSetupError('profile');
	}
};

/**
 * @param {Object} config
 */
export const checkConfig = (config) => {
	const {
		uuidNamespace,
		lineSeparator,
		columnSeparator,
		timezone,
		dateFormat,
		columns,
		outputColumns,
		outputLocales,
		outputColumnSeparator,
	} = config;
	if (!basicValueCheck('string', uuidNamespace)) {
		throw new InvalidSetupError('config.uuidNamespace');
	}
	if (!basicValueCheck('string', lineSeparator)) {
		throw new InvalidSetupError('config.lineSeparator');
	}
	if (!basicValueCheck('string', columnSeparator)) {
		throw new InvalidSetupError('config.columnSeparator');
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
	if (!basicValueCheck('string', columns)) {
		throw new InvalidSetupError('config.columns');
	}
	if (!basicValueCheck('string', outputLocales)) {
		throw new InvalidSetupError('config.outputLocales');
	}
	if (outputColumns && !basicValueCheck('string', outputColumns)) {
		throw new InvalidSetupError('config.outputColumns');
	}
	if (outputColumnSeparator && !basicValueCheck('string', outputColumnSeparator)) {
		throw new InvalidSetupError('config.outputColumnSeparator');
	}
};
