import { checkProfile, checkConfig, checkLibrary } from '../utils/common.js';
import { _makeOverviewFromTransactions } from './makeOverviewFromTransactions.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';
import { getCurrencyNormalization } from '../utils/getCurrencyNormalization.js';
import { getExcelLikeColumnName } from '../utils/getExcelLikeColumnName.js';
import { makeTableData } from '../utils/makeTableData.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { FatalError } from '../error/FatalError.js';

function getCurrencyRecalculater(sourceCurrency, targetCurrency) {
	if (sourceCurrency === targetCurrency) {
		return '';
	}

	const [sourceSupportedCurrency, sourceMultiplier] = getCurrencyNormalization(sourceCurrency);
	return `*GOOGLEFINANCE("${sourceSupportedCurrency}${targetCurrency}")*${sourceMultiplier}`;
}

/**
 * @param {Config} config
 * @param {HSOON} hsoon
 */
function makeOverviewTableData(config, hsoon) {
	const { tickerMap, overviewColumns, columnSeparator } = config;
	const mainCurrency = hsoon[0].totalTotalCurrency;
	if (hsoon.find((item) => item.totalTotalCurrency !== mainCurrency)) {
		throw new FatalError('Currency mismatch.', {
			cause: `${item.totalTotalCurrency} != ${mainCurrency}`,
			source: makeOverviewTableData.name,
			value: item.totalTotalCurrency,
		});
	}

	const columns = overviewColumns.split(columnSeparator);
	const tColumn_quantity = getExcelLikeColumnName(columns, 'quantity');
	const tColumn_currentValue = getExcelLikeColumnName(columns, 'currentValue');
	const tColumn_totalCost = getExcelLikeColumnName(columns, 'totalCost');
	const tColumn_currentTotalValue = getExcelLikeColumnName(columns, 'currentTotalValue');
	const tColumn_result = getExcelLikeColumnName(columns, 'result');

	const entries = hsoon.map((item, index) => {
		const { isin, product, quantity, totalLocalValueCurrency, totalTotal } = item;

		const tRow_current = index + 2; // 0 -> 1 + columns

		return {
			isin,
			product,
			quantity,
			currency: mainCurrency,
			totalCost: totalTotal,
			avgCost: totalTotal === 0 ? 0 : quantity === 0 ? /* TODO */ '' : totalTotal / quantity,
			currentValue: tickerMap[isin]
				? `=GOOGLEFINANCE("${tickerMap[isin].default}")${getCurrencyRecalculater(totalLocalValueCurrency, mainCurrency)}`
				: '',
			currentTotalValue: `=${tColumn_quantity}${tRow_current} * ${tColumn_currentValue}${tRow_current}`,
			result: `=${tColumn_currentTotalValue}${tRow_current} - ${tColumn_totalCost}${tRow_current}`,
		};
	});

	const footer = [...Array(columns.length - 1).fill(''), `=SUM(${tColumn_result}2:${tColumn_result}${entries.length + 1})`];

	return [...makeTableData({ columns }, entries), footer];
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
		throw new InvalidInputError('', { source: makeOverviewFromTransactionsEnhancedCsv.name, value: csv });
	}

	const overview = await _makeOverviewFromTransactions(lib, profile, config, csv);
	const tableData = makeOverviewTableData(config, overview);

	const { lineSeparator, columnSeparator, outputColumnSeparator } = config;
	return tableData.map((row) => row.join(outputColumnSeparator || columnSeparator)).join(lineSeparator);
}
