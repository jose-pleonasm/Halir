import { checkProfile, checkConfig } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeOds } from '../lib/ods/index.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<Buffer>}
 */
export async function makeOverviewFromTransactionsOds(profile, config, input) {
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsOds.name, value: input });
	}

	const { numberScaleFactor } = config;
	const columns = [
		'isin',
		'product',
		'quantity',
		'totalLocalValue',
		'totalLocalValueCurrency',
		'totalValue',
		'totalValueCurrency',
		'totalFees',
		'totalFeesCurrency',
		'total',
		'totalCurrency',
	];
	const hston = await csvToHston(profile, config, input);
	const overview = await makeOverview({ numberScaleFactor }, hston);
	const tableData = makeTableData({ columns }, overview);
	return makeOds(tableData);
}
