import { InvalidParamError } from '../error/InvalidParamError.js';
import { basicValueCheck } from './basicValueCheck.js';

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
		overviewColumns,
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
	if (!omit.includes('overviewColumns') && !basicValueCheck('string', overviewColumns)) {
		throw new InvalidParamError('config.overviewColumns');
	}
	if (!omit.includes('outputColumns') && outputColumns && !basicValueCheck('string', outputColumns)) {
		throw new InvalidParamError('config.outputColumns');
	}
	if (!omit.includes('outputColumnSeparator') && outputColumnSeparator && !basicValueCheck('string', outputColumnSeparator)) {
		throw new InvalidParamError('config.outputColumnSeparator');
	}
};

/**
 * @param {Library} lib
 * @param {string[]?} omit
 */
export const checkLibrary = (lib, omit = []) => {
	const { uuidV5, makeOdsFiles, makeZip } = lib;
	if (!omit.includes('uuidV5') && !basicValueCheck('function', uuidV5)) {
		throw new InvalidParamError('library.uuidV5');
	}
	if (!omit.includes('makeOdsFiles') && !basicValueCheck('function', makeOdsFiles)) {
		throw new InvalidParamError('library.makeOdsFiles');
	}
	if (!omit.includes('makeZip') && !basicValueCheck('function', makeZip)) {
		throw new InvalidParamError('library.makeZip');
	}
};
