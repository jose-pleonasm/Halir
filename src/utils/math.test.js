import { expect, test } from 'vitest';
import { add } from './math.js';

test('adds 1 + 2 to equal 3', () => {
	expect(add(1, 1, 2)).toBe(3);
});

test('should handle float numbers properly', () => {
	expect(add(10000, 3.3, 2.9)).toBe(6.2);
});
