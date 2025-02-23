import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsv } from '../test/mocks.js';
import { makeOverviewFromTransactionsEnhancedCsv } from './makeOverviewFromTransactionsEnhancedCsv.js';

const lib = getTestLib();
const config = {
	...getTestConfig(),
	overviewColumns: 'isin,product,currency,quantity,avgCost,totalCost,currentValue,currentTotalValue,result',
};

test('creates a string from CSV (basic check)', async () => {
	const result = await makeOverviewFromTransactionsEnhancedCsv(lib, 'degiro', config, basicTransactionsCsv);
	expect(result).toBeTruthy();
	expect(result).toBeTypeOf('string');
});

test('creates an overview CSV from transactions CSV (extended check)', async () => {
	const result = await makeOverviewFromTransactionsEnhancedCsv(lib, 'degiro', config, basicTransactionsCsv);

	const lines = result.split(config.lineSeparator);
	expect(lines.length).toBe(4);
	expect(lines[0]).toBe('isin,product,currency,quantity,avgCost,totalCost,currentValue,currentTotalValue,result');
	expect(lines[1]).contains('US0079031078');
	expect(lines[2]).contains('US7475251036');
});
