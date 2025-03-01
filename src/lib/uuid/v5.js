function stringToBytes(str) {
	return new TextEncoder().encode(str);
}

function uuidToBytes(uuid) {
	return uuid
		.replace(/-/g, '')
		.match(/.{2}/g)
		.map((byte) => parseInt(byte, 16));
}

function bytesToUuid(bytes) {
	const hex = bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hex.slice(18, 20)}-${hex.slice(20)}`;
}

async function sha1(bytes) {
	if (typeof crypto !== 'undefined' && crypto.subtle) {
		const hashBuffer = await crypto.subtle.digest('SHA-1', new Uint8Array(bytes));
		return Array.from(new Uint8Array(hashBuffer));
	} else {
		// Fallback for environments without `crypto.subtle` (e.g., older Node.js versions)
		const crypto = require('crypto');
		return Array.from(crypto.createHash('sha1').update(Buffer.from(bytes)).digest());
	}
}

export async function uuidV5(name, namespace) {
	const namespaceBytes = uuidToBytes(namespace);
	const nameBytes = stringToBytes(name);
	const hash = await sha1([...namespaceBytes, ...nameBytes]);
	hash[6] = (hash[6] & 0x0f) | 0x50; // Set version 5
	hash[8] = (hash[8] & 0x3f) | 0x80; // Set variant
	return bytesToUuid(hash.slice(0, 16));
}
