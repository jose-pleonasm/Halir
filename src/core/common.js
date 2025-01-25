import { InvalidParamError } from '../error/InvalidParamError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

export const SUPPORTED_PROFILES = ['degiro'];

export const checkProfile = (profile) => {
	if (!SUPPORTED_PROFILES.includes(profile)) {
		throw new InvalidParamError('profile');
	}
};

/**
 * @param {Object} config
 */
export const checkConfig = (config) => {
	const {
		uuidNamespace,
		numberScaleFactor,
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
		throw new InvalidParamError('config.uuidNamespace');
	}
	if (!basicValueCheck('number', numberScaleFactor) || isNaN(numberScaleFactor)) {
		throw new InvalidParamError('config.numberScaleFactor');
	}
	if (!basicValueCheck('string', lineSeparator)) {
		throw new InvalidParamError('config.lineSeparator');
	}
	if (!basicValueCheck('string', columnSeparator)) {
		throw new InvalidParamError('config.columnSeparator');
	}
	if (!basicValueCheck('string', columnSeparator)) {
		throw new InvalidParamError('config.columnSeparator');
	}
	if (!basicValueCheck('string', timezone)) {
		throw new InvalidParamError('config.timezone');
	}
	if (!basicValueCheck('string', dateFormat)) {
		throw new InvalidParamError('config.dateFormat');
	}
	if (!basicValueCheck('string', columns)) {
		throw new InvalidParamError('config.columns');
	}
	if (!basicValueCheck('string', outputLocales)) {
		throw new InvalidParamError('config.outputLocales');
	}
	if (outputColumns && !basicValueCheck('string', outputColumns)) {
		throw new InvalidParamError('config.outputColumns');
	}
	if (outputColumnSeparator && !basicValueCheck('string', outputColumnSeparator)) {
		throw new InvalidParamError('config.outputColumnSeparator');
	}
};
