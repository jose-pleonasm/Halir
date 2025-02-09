import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { makeOverviewFromTransactionsInternal } from './makeOverviewFromTransactions.js';
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

		// TODO: prevest vsecno na ucetni menu (napr: Price / Exchange rate)

		const tRow_current = index + 1;
		const tColumn_currentLocalValue = 'L'; // TODO: vypočítat z columns

		const relHsoonItem = hsoon[index - 1];
		const currentLocalValue = config.tickerMap[row[0]] ? `=GOOGLEFINANCE("${config.tickerMap[row[0]].default}")` : '';
		const currentLocalValueCurrency = config.tickerMap[row[0]]
			? `=IF(GOOGLEFINANCE("${config.tickerMap[row[0]].default}"; "currency") = "${relHsoonItem.totalLocalValueCurrency}"; "${relHsoonItem.totalLocalValueCurrency}"; "[CURRENCY_ERROR]")`
			: '';
		// TODO: fix currencies like GBX
		const currentPrice =
			relHsoonItem.totalLocalValueCurrency === relHsoonItem.totalCurrency
				? `=${tColumn_currentLocalValue}${tRow_current}`
				: `=GOOGLEFINANCE("CURRENCY:${relHsoonItem.totalLocalValueCurrency}${relHsoonItem.totalCurrency}") * ${tColumn_currentLocalValue}${tRow_current}`;
		return [...row, currentLocalValue, currentLocalValueCurrency, currentPrice];
	});
}

/**
 * @param {Library} lib
 * @param {Profile} profile
 * @param {Config} config
 * @param {string} csv
 * @returns {Promise<string>}
 */
export async function makeOverviewFromTransactionsEnhancedCsv(lib, profile, config, csv) {
	checkLibrary(lib);
	checkProfile(profile);
	checkConfig(config);
	if (!basicValueCheck('string', csv)) {
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsCsv.name, value: csv });
	}

	const overview = await makeOverviewFromTransactionsInternal(lib, profile, config, csv);

	const { lineSeparator, columnSeparator, overviewColumns } = config;
	const columns = overviewColumns.split(columnSeparator);
	const tableData = makeTableData({ columns }, overview);

	const enhancedTableData = enhanceTableData(config, overview, tableData);
	return enhancedTableData.map((row) => row.join(columnSeparator)).join(lineSeparator);
}
