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

	const enhancedTableData = tableData.map((row, index) => {
		if (index === 0) {
			return [...row, 'TEST', 'current price'];
		}

		const test = { formula: `of:=[.C${index + 1}]` };
		const currentPrice = row[0] === 'US67066G1040' ? { formula: 'of:=GOOGLEFINANCE(&quot;NASDAQ:NVDA&quot;)', type: 'currency' } : null;
		return [...row, test, currentPrice];
	});

	return makeOds(enhancedTableData);
}
