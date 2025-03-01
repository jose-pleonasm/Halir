function createBuffer(data, encoding = 'utf8') {
	const isNode = typeof Buffer !== 'undefined' && typeof process !== 'undefined';
	if (isNode) {
		return Buffer.from(data, encoding);
	} else {
		return new TextEncoder().encode(data);
	}
}

function makeCRCTable() {
	let c;
	const crcTable = [];
	for (let n = 0; n < 256; n++) {
		c = n;
		for (let k = 0; k < 8; k++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		}
		crcTable[n] = c >>> 0;
	}
	return crcTable;
}

const crcTable = makeCRCTable();

function crc32(buf) {
	let crc = 0 ^ -1;
	for (let i = 0; i < buf.length; i++) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
	}
	return (crc ^ -1) >>> 0;
}

function writeUInt16LE(num) {
	const buf = new Uint8Array(2);
	buf[0] = num & 0xff;
	buf[1] = (num >> 8) & 0xff;
	return buf;
}

function writeUInt32LE(num) {
	const buf = new Uint8Array(4);
	buf[0] = num & 0xff;
	buf[1] = (num >> 8) & 0xff;
	buf[2] = (num >> 16) & 0xff;
	buf[3] = (num >> 24) & 0xff;
	return buf;
}

/**
 * Create a ZIP archive from a list of files (with no compression).
 *
 * @param {FileContainer[]} files
 */
export async function makeZip(files) {
	const localFileHeaders = [];
	const centralDirectoryRecords = [];
	let offset = 0;

	for (let file of files) {
		const filenameBuf = createBuffer(file.name);
		const fileData = createBuffer(file.data);
		const fileCRC = crc32(fileData);
		const compressedSize = fileData.length;
		const uncompressedSize = fileData.length;

		const localHeader = new Uint8Array([
			...writeUInt32LE(0x04034b50),
			...writeUInt16LE(20),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt32LE(fileCRC),
			...writeUInt32LE(compressedSize),
			...writeUInt32LE(uncompressedSize),
			...writeUInt16LE(filenameBuf.length),
			...writeUInt16LE(0),
		]);

		localFileHeaders.push(localHeader, filenameBuf, fileData);

		const centralHeader = new Uint8Array([
			...writeUInt32LE(0x02014b50),
			...writeUInt16LE(20),
			...writeUInt16LE(20),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt32LE(fileCRC),
			...writeUInt32LE(compressedSize),
			...writeUInt32LE(uncompressedSize),
			...writeUInt16LE(filenameBuf.length),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt16LE(0),
			...writeUInt32LE(0),
			...writeUInt32LE(offset),
		]);

		centralDirectoryRecords.push(centralHeader, filenameBuf);
		offset += localHeader.length + filenameBuf.length + fileData.length;
	}

	const fileDataSection = new Uint8Array(localFileHeaders.reduce((acc, arr) => acc + arr.length, 0));
	let pos = 0;
	localFileHeaders.forEach((arr) => {
		fileDataSection.set(arr, pos);
		pos += arr.length;
	});

	const centralDirectory = new Uint8Array(centralDirectoryRecords.reduce((acc, arr) => acc + arr.length, 0));
	pos = 0;
	centralDirectoryRecords.forEach((arr) => {
		centralDirectory.set(arr, pos);
		pos += arr.length;
	});

	const eocd = new Uint8Array([
		...writeUInt32LE(0x06054b50),
		...writeUInt16LE(0),
		...writeUInt16LE(0),
		...writeUInt16LE(files.length),
		...writeUInt16LE(files.length),
		...writeUInt32LE(centralDirectory.length),
		...writeUInt32LE(offset),
		...writeUInt16LE(0),
	]);

	const finalZip = new Uint8Array(fileDataSection.length + centralDirectory.length + eocd.length);
	finalZip.set(fileDataSection, 0);
	finalZip.set(centralDirectory, fileDataSection.length);
	finalZip.set(eocd, fileDataSection.length + centralDirectory.length);

	return finalZip;
}
