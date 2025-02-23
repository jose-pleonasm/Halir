import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';
import { writeFileSync } from 'fs';

async function makeOds({ makeOdsFiles, makeZip }, sheetData) {
	const files = await makeOdsFiles(sheetData);

	// TODO: remove
	writeFileSync(
		'/Users/josepleonasm/Work/www/playground/google-sheets/_content.xml',
		files.find((file) => file.name === 'content.xml').data,
	);

	return makeZip(files);
}

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<Buffer>}
 */
export async function makeOverviewFromTransactionsOds(lib, profile, config, csv) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', csv)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsOds.name, value: csv });
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
		'totalTotal',
		'totalTotalCurrency',
	];
	const hston = await csvToHston(lib, profile, config, csv);
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

	return makeOds(lib, enhancedTableData);
}
