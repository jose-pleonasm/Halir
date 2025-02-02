import { checkProfile, checkConfig } from '../utils/common.js';
import { csvToHston } from './csvToHston.js';
import { makeOverview } from './makeOverview.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

/**
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} input
 * @returns {Promise<string>}
 */
export async function makeOverviewFromTransactionsEnhancedCsv(profile, config, input) {
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', input)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsCsv.name, value: input });
	}

	const { lineSeparator, columnSeparator, numberScaleFactor, overviewColumns } = config;
	const columns = overviewColumns.split(columnSeparator);
	const hston = await csvToHston(profile, config, input);
	const overview = await makeOverview({ numberScaleFactor }, hston);
	const tableData = makeTableData({ columns }, overview);

	const enhancedTableData = tableData.map((row, index) => {
		if (index === 0) {
			return [...row, 'TEST', 'current price'];
		}

		const test = `=C${index + 1}`;
		const currentPrice = row[0] === 'US67066G1040' ? `=GOOGLEFINANCE("NASDAQ:NVDA")` : null;
		return [...row, test, currentPrice];
	});

	return enhancedTableData.map((row) => row.join(columnSeparator)).join(lineSeparator);
}
