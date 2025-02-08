import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Config} config
 * @param {HSOON} hsoon
 * @param {any[][]} tableData
 */
function enhanceTableData(config, hsoon, tableData) {
	return tableData.map((row, index) => {
		if (index === 0) {
			return [...row, 'currentLocalValue', 'currentLocalValueCurrency', 'currentPrice'];
		}

		const relHsoonItem = hsoon[index - 1];
		const currentTableRowNumber = index + 1;
		const currentLocalValue = config.ticker[row[0]] ? `=GOOGLEFINANCE("${config.ticker[row[0]].default}")` : '';
		const currentLocalValueCurrency = config.ticker[row[0]] ? `=GOOGLEFINANCE("${config.ticker[row[0]].default}"; "currency")` : '';
		// TODO: IFERROR because of a case when source currency and target currency are the same
		// TODO: fix currencies like GBX
		const currentPrice = `=IFERROR(GOOGLEFINANCE("CURRENCY:" & M${currentTableRowNumber} & "${relHsoonItem.totalCurrency}"); 1) * L${currentTableRowNumber}`;
		return [...row, currentLocalValue, currentLocalValueCurrency, currentPrice];
	});
}

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<string>}
 */
export async function makeOverviewFromTransactionsEnhancedCsv(lib, profile, config, input) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsCsv.name, value: input });
	}

	const { lineSeparator, columnSeparator, numberScaleFactor, overviewColumns } = config;
	const columns = overviewColumns.split(columnSeparator);
	const hston = await csvToHston(lib, profile, config, input);
	const overview = await makeOverview({ numberScaleFactor }, hston);
	const tableData = makeTableData({ columns }, overview);

	const enhancedTableData = enhanceTableData(config, overview, tableData);
	return enhancedTableData.map((row) => row.join(columnSeparator)).join(lineSeparator);
}
