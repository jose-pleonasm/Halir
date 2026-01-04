import { uuidV5 } from '../lib/uuid/v5.js';

export async function makeId({ ns = 'halir-id', prefix = 'hid' }, value) {
	const uuid = await uuidV5(value, ns);
	return `${prefix}${uuid.replaceAll('-', '')}`;
}
