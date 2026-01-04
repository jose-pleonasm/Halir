import { expect, test } from 'vitest';
import { getTestLib } from '../test/getTestLib.js';
import { getTestConfig } from '../test/getTestConfig.js';
import { REGEXP_UUID } from '../test/utils.js';
import { basicTransactionsCsv, basicTransactionsCsvWithSillyPriceFormat } from '../test/mocks.js';
import { csvToHston } from './csvToHston.js';

const lib = getTestLib();
const config = getTestConfig();

const csvs = [basicTransactionsCsv, basicTransactionsCsvWithSillyPriceFormat];

test.each(csvs)('creates an array from CSV (basic check) for file number %#', async (csv) => {
	const result = await csvToHston(lib, 'degiro', config, csv);
	expect(result).toBeInstanceOf(Array);
});

test.each(csvs)('creates valid HSTON (full check) for file number %#', async (csv) => {
	const hston = await csvToHston(lib, 'degiro', config, csv);
	expect(hston.length).toBe(2);
	expect(hston[0]).toEqual(
		expect.objectContaining({
			isin: 'US0079031078',
			id: expect.stringMatching(REGEXP_UUID),
			datetime: expect.stringContaining('2025-01-01'),
			product: expect.any(String),
			referenceExchange: expect.any(String),
			venue: expect.any(String),
			quantity: 1,
			price: 5,
			priceCurrency: expect.any(String),
			localValue: expect.any(Number),
			localValueCurrency: expect.any(String),
			value: expect.any(Number),
			valueCurrency: expect.any(String),
			exchangeRate: expect.any(Number),
			fees: expect.any(Number),
			feesCurrency: expect.any(String),
			total: expect.any(Number),
			totalCurrency: expect.any(String),
		}),
	);
	expect(hston[1]).toEqual(
		expect.objectContaining({
			isin: 'US7475251036',
			id: expect.stringMatching(REGEXP_UUID),
			datetime: expect.stringContaining('2025-01-02'),
			product: expect.any(String),
			referenceExchange: expect.any(String),
			venue: expect.any(String),
			quantity: 1,
			price: 6.6,
			priceCurrency: expect.any(String),
			localValue: expect.any(Number),
			localValueCurrency: expect.any(String),
			value: expect.any(Number),
			valueCurrency: expect.any(String),
			exchangeRate: expect.any(Number),
			fees: expect.any(Number),
			feesCurrency: expect.any(String),
			total: expect.any(Number),
			totalCurrency: expect.any(String),
		}),
	);
});

test('creates correct UUID of version 5', async () => {
	const uuidNamespace = '8b558875-4377-477b-8d81-9b66ca9701b3';
	const hston = await csvToHston(lib, 'degiro', { ...config, uuidNamespace }, basicTransactionsCsv);
	expect(hston[0].id).toBe('5e8b8fd3-90d2-5141-95a9-86c3abdf9170');
});
