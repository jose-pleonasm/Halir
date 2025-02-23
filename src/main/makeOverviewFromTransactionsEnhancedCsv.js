import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { makeOverviewFromTransactionsInternal } from './makeOverviewFromTransactions.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { CommonTypeError } from '../error/CommonTypeError.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';

function getCharByPosition(position) {
	if (position < 1 || position > 26) {
		throw new CommonTypeError('Position must be between 1 and 26.');
	}

	return String.fromCharCode(96 + position); // 'a' is 97 in ASCII
}

/**
 * @param {Config} config
 * @param {HSOON} hsoon
 * @param {any[][]} tableData
 */
function enhanceTableData(config, hsoon, tableData) {
	const { tickerMap } = config;

	const [header, ...rows] = tableData;
	const enhancedHeader = [...header, 'currentLocalValue', 'currentLocalValueCurrency', 'currentPrice'];
	const enhancedRows = rows.map((row, index) => {
		// TODO: prevest vsechno na ucetni menu (napr: Price / Exchange rate)

		const tRow_current = index + 2; // 0 -> 1 + header
		const tColumn_currentLocalValue_index = enhancedHeader.findIndex((column) => column === 'currentLocalValue');
		const tColumn_currentLocalValue = getCharByPosition(tColumn_currentLocalValue_index + 1).toUpperCase();

		const isin = row[0];
		const relHsoonItem = hsoon[index];
		const currentLocalValue = tickerMap[isin] ? `=GOOGLEFINANCE("${tickerMap[isin].default}")` : '';
		const currentLocalValueCurrency = tickerMap[isin]
			? `=IF(GOOGLEFINANCE("${tickerMap[isin].default}"; "currency") = "${relHsoonItem.totalLocalValueCurrency}"; "${relHsoonItem.totalLocalValueCurrency}"; "[CURRENCY_ERROR]")`
			: '';
		// TODO: fix currencies like GBX
		const currentPrice =
			relHsoonItem.totalLocalValueCurrency === relHsoonItem.totalTotalCurrency
				? `=${tColumn_currentLocalValue}${tRow_current}`
				: `=GOOGLEFINANCE("CURRENCY:${relHsoonItem.totalLocalValueCurrency}${relHsoonItem.totalTotalCurrency}") * ${tColumn_currentLocalValue}${tRow_current}`;

		return [...row, currentLocalValue, currentLocalValueCurrency, currentPrice];
	});

	return [enhancedHeader, ...enhancedRows];
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
