import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsv } from '../test/mocks.js';
import { makeOverviewFromTransactionsEnhancedCsv } from './makeOverviewFromTransactionsEnhancedCsv.js';

const lib = getTestLib();
const config = getTestConfig();

test('creates a string from CSV (basic check)', async () => {
	const result = await makeOverviewFromTransactionsEnhancedCsv(lib, 'degiro', config, basicTransactionsCsv);
	expect(result).toBeTruthy();
	expect(result).toBeTypeOf('string');
});

test('creates an overview CSV from transactions CSV (extended check)', async () => {
	const result = await makeOverviewFromTransactionsEnhancedCsv(lib, 'degiro', config, basicTransactionsCsv);

	const lines = result.split(config.lineSeparator);
	expect(lines.length).toBe(3);
	expect(lines[0]).toBe(
		'isin,product,quantity,totalLocalValue,totalLocalValueCurrency,totalValue,totalValueCurrency,totalFees,totalFeesCurrency,total,totalCurrency,TEST,current price',
	);
	expect(lines[1]).contains('US0079031078');
	expect(lines[2]).contains('US7475251036');
});
