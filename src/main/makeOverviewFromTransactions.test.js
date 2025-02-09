import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsv } from '../test/mocks.js';
import { makeOverviewFromTransactions } from './makeOverviewFromTransactions.js';

const lib = getTestLib();
const config = getTestConfig();

test('creates an array from CSV (basic check)', async () => {
	const result = await makeOverviewFromTransactions(lib, 'degiro', config, basicTransactionsCsv);
	expect(result).toBeInstanceOf(Array);
});

// TODO: dodelat testy
