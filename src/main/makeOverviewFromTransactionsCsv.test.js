import { expect, test } from 'vitest';
import { v5 as uuidV5 } from 'uuid';
import { makeOdsFiles } from '../lib/ods/makeOdsFiles.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { makeOverviewFromTransactionsCsv } from './makeOverviewFromTransactionsCsv.js';

const lib = { uuidV5, makeOdsFiles, makeZip: async () => '' };
const config = getTestConfig();

const csv = `Date,Time,Product,ISIN,Reference,Venue,Quantity,Price,,Local value,,Value,,Exchange rate,Transaction and/or third,,Total,,Order ID
01-01-2025,15:30,ADVANCED MICRO DEVICES,US0079031078,NDQ,XNAS,1,5.00,USD,-4.00,USD,-4.00,EUR,0,-2.00,EUR,-6.00,EUR,abdfd8cc-b02e-48ae-bb88-8a637f3ca1a0
02-01-2025,15:30,QUALCOMM INCORPORATED,US7475251036,NDQ,XNAS,1,6.60,USD,-5.60,USD,-5.60,EUR,0,-2.00,EUR,-7.60,EUR,237c0daf-bd73-4b91-9ba0-63b7ca054333
`;

test('returns overview in CSV format', async () => {
	const result = await makeOverviewFromTransactionsCsv(lib, 'degiro', config, csv);
	expect(result)
		.toBe(`isin,product,quantity,totalLocalValue,totalLocalValueCurrency,totalValue,totalValueCurrency,totalFees,totalFeesCurrency,total,totalCurrency
US0079031078,ADVANCED MICRO DEVICES,1,4,USD,4,EUR,2,EUR,6,EUR
US7475251036,QUALCOMM INCORPORATED,1,5.6,USD,5.6,EUR,2,EUR,7.6,EUR`);
});
