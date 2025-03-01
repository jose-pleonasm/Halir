import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsv } from '../test/mocks.js';
import { makeOverviewFromTransactionsOds } from './makeOverviewFromTransactionsOds.js';

const lib = getTestLib();
const config = {
	...getTestConfig(),
};

test('creates a string from CSV (basic check)', async () => {
	const result = await makeOverviewFromTransactionsOds(lib, 'degiro', config, basicTransactionsCsv);
	expect(result).toBeTruthy();
	expect(result).toBeInstanceOf(Uint8Array);
});
