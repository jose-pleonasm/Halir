import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { basicTransactionsCsvhv14729eb4c430850b9929b3d15b054a673 } from '../test/mocks.js';
import { makeOverviewFromTransactionsCsv } from './makeOverviewFromTransactionsCsv.js';

const lib = getTestLib();
const config = {
	...getTestConfig(),
	outputColumnSeparator: ',',
};

test('returns overview in CSV format', async () => {
	const result = await makeOverviewFromTransactionsCsv(lib, 'degiro', config, basicTransactionsCsvhv14729eb4c430850b9929b3d15b054a673);
	expect(result)
		.toBe(`isin,product,quantity,totalLocalValue,totalLocalValueCurrency,totalValue,totalValueCurrency,totalFees,totalFeesCurrency,totalTotal,totalTotalCurrency
US0079031078,ADVANCED MICRO DEVICES,1,4,USD,4,EUR,2,EUR,6,EUR
US7475251036,QUALCOMM INCORPORATED,1,5.6,USD,5.6,EUR,2,EUR,7.6,EUR`);
});
