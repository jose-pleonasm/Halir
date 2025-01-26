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
 * @param {string[]?} omit
 */
export const checkConfig = (config, omit = []) => {
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
	if (!omit.includes('uuidNamespace') && !basicValueCheck('string', uuidNamespace)) {
		throw new InvalidParamError('config.uuidNamespace');
	}
	if (!omit.includes('numberScaleFactor') && (!basicValueCheck('number', numberScaleFactor) || isNaN(numberScaleFactor))) {
		throw new InvalidParamError('config.numberScaleFactor');
	}
	if (!omit.includes('lineSeparator') && !basicValueCheck('string', lineSeparator)) {
		throw new InvalidParamError('config.lineSeparator');
	}
	if (!omit.includes('columnSeparator') && !basicValueCheck('string', columnSeparator)) {
		throw new InvalidParamError('config.columnSeparator');
	}
	if (!omit.includes('timezone') && !basicValueCheck('string', timezone)) {
		throw new InvalidParamError('config.timezone');
	}
	if (!omit.includes('dateFormat') && !basicValueCheck('string', dateFormat)) {
		throw new InvalidParamError('config.dateFormat');
	}
	if (!omit.includes('columns') && !basicValueCheck('string', columns)) {
		throw new InvalidParamError('config.columns');
	}
	if (!omit.includes('outputLocales') && !basicValueCheck('string', outputLocales)) {
		throw new InvalidParamError('config.outputLocales');
	}
	if (!omit.includes('outputColumns') && outputColumns && !basicValueCheck('string', outputColumns)) {
		throw new InvalidParamError('config.outputColumns');
	}
	if (!omit.includes('outputColumnSeparator') && outputColumnSeparator && !basicValueCheck('string', outputColumnSeparator)) {
		throw new InvalidParamError('config.outputColumnSeparator');
	}
};
