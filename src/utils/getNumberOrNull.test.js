import { describe, test, expect } from 'vitest';
import { getNumberOrNull } from './getNumberOrNull';

describe('getNumberOrNull', () => {
	test.each([
		['42', 42],
		['3.14', 3.14],
		['0', 0],
		['-123.456', -123.456],
		[null, null],
		['', null],
		[NaN, NaN],
		['   ', NaN], // whitespace-only becomes NaN
		['abc', NaN], // invalid numeric string
		['123abc', 123], // parseFloat allows partial parsing
		['0.00001', 0.00001],
		['Infinity', Infinity],
		['-Infinity', -Infinity],
		// for some reason Degiro started export numbers in this format
		['"0"', 0],
		['"-123,456"', -123.456],
	])('getNumberOrNull(%j) -> %j', (input, expected) => {
		const result = getNumberOrNull(input);

		if (Number.isNaN(expected)) {
			expect(result).toBeNaN();
		} else {
			expect(result).toBe(expected);
		}
	});
});
