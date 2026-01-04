import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsvhv14729eb4c430850b9929b3d15b054a673 } from '../test/mocks.js';
import { makeOverviewFromTransactionsOds } from './makeOverviewFromTransactionsOds.js';

const lib = getTestLib();
const config = {
	...getTestConfig(),
};

test('creates a string from CSV (basic check)', async () => {
	const result = await makeOverviewFromTransactionsOds(lib, 'degiro', config, basicTransactionsCsvhv14729eb4c430850b9929b3d15b054a673);
	expect(result).toBeTruthy();
	expect(result).toBeInstanceOf(Uint8Array);
});
