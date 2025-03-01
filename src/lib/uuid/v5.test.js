import { expect, test } from 'vitest';
import { uuidV5 } from './v5.js';

const value = JSON.stringify({ id: '1', title: 'test', priority: 1 });

test('generates the correct UUID of version 5', async () => {
	const namespace = 'b2d46836-075b-4a23-9e89-5b49b32d47a2';
	const result = await uuidV5(value, namespace);
	expect(result).toBe('25d97eb6-12e3-5077-8a69-d521a958b019');
});

test('generates diffirents UUID of version 5 with different namespace', async () => {
	const namespace = 'a0ecd372-80ee-4ba1-a3dc-3bcf6d032f36';
	const result = await uuidV5(value, namespace);
	expect(result).toBe('51becd77-d08a-5e26-9395-ea9eb5f122a9');
});
