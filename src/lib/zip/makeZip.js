import { Buffer } from 'buffer';

// ZIP archive is created with no compression. (For production use, you’d need to be more robust.)

/**
 * Compute CRC32 for a given Buffer.
 * This implementation uses a precalculated table.
 */
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

/**
 * Create a ZIP archive from a list of files.
 * Each file is an object with:
 *    name: path/name of file in archive (string)
 *    data: Buffer containing file contents
 * The archive is built with no compression.
 */
export async function makeZip(files) {
	// Arrays to store parts of the ZIP archive
	const localFileHeaders = [];
	const centralDirectoryRecords = [];
	let offset = 0;

	// Helper function: write a 16-bit little–endian value to a Buffer.
	function writeUInt16LE(num) {
		const buf = Buffer.alloc(2);
		buf.writeUInt16LE(num, 0);
		return buf;
	}
	// Helper: 32–bit LE.
	function writeUInt32LE(num) {
		const buf = Buffer.alloc(4);
		buf.writeUInt32LE(num, 0);
		return buf;
	}

	// Process each file to create its local file header and record central directory info.
	for (let file of files) {
		const filenameBuf = Buffer.from(file.name, 'utf8');
		const fileData = Buffer.from(file.data, 'utf8');
		const fileCRC = crc32(fileData);
		const compressedSize = fileData.length;
		const uncompressedSize = fileData.length;

		// Local file header:
		// signature (4 bytes) + version (2) + flag (2) + compression (2)
		// + mod time (2) + mod date (2) + crc32 (4)
		// + compressed size (4) + uncompressed size (4)
		// + filename length (2) + extra field length (2)
		const localHeader = Buffer.concat([
			writeUInt32LE(0x04034b50), // Local file header signature
			writeUInt16LE(20), // Version needed to extract
			writeUInt16LE(0), // General purpose bit flag
			writeUInt16LE(0), // Compression method (0 = no compression)
			writeUInt16LE(0), // Last mod file time
			writeUInt16LE(0), // Last mod file date
			writeUInt32LE(fileCRC), // CRC-32
			writeUInt32LE(compressedSize), // Compressed size
			writeUInt32LE(uncompressedSize), // Uncompressed size
			writeUInt16LE(filenameBuf.length), // File name length
			writeUInt16LE(0), // Extra field length
		]);
		// Append header + filename + file data.
		localFileHeaders.push(localHeader, filenameBuf, fileData);

		// Create central directory record for this file.
		const centralHeader = Buffer.concat([
			writeUInt32LE(0x02014b50), // Central file header signature
			writeUInt16LE(20), // Version made by
			writeUInt16LE(20), // Version needed to extract
			writeUInt16LE(0), // General purpose bit flag
			writeUInt16LE(0), // Compression method
			writeUInt16LE(0), // Last mod file time
			writeUInt16LE(0), // Last mod file date
			writeUInt32LE(fileCRC), // CRC-32
			writeUInt32LE(compressedSize), // Compressed size
			writeUInt32LE(uncompressedSize), // Uncompressed size
			writeUInt16LE(filenameBuf.length), // File name length
			writeUInt16LE(0), // Extra field length
			writeUInt16LE(0), // File comment length
			writeUInt16LE(0), // Disk number start
			writeUInt16LE(0), // Internal file attributes
			writeUInt32LE(0), // External file attributes
			writeUInt32LE(offset), // Relative offset of local header
		]);
		// Append central header and filename.
		centralDirectoryRecords.push(centralHeader, filenameBuf);

		// Update offset: add local header, filename, and file data length.
		offset += localHeader.length + filenameBuf.length + fileData.length;
	}

	// Concatenate all local file entries.
	const fileDataSection = Buffer.concat(localFileHeaders);

	// Create the central directory section.
	const centralDirectory = Buffer.concat(centralDirectoryRecords);
	const centralDirSize = centralDirectory.length;
	const centralDirOffset = offset;

	// End of central directory record:
	// signature (4) + disk number (2) + start disk (2) +
	// total entries on this disk (2) + total entries (2) +
	// central directory size (4) + central directory offset (4) +
	// comment length (2)
	const eocd = Buffer.concat([
		writeUInt32LE(0x06054b50), // End of central dir signature
		writeUInt16LE(0), // Number of this disk
		writeUInt16LE(0), // Disk where central directory starts
		writeUInt16LE(files.length), // Number of central directory records on this disk
		writeUInt16LE(files.length), // Total number of central directory records
		writeUInt32LE(centralDirSize), // Size of central directory
		writeUInt32LE(centralDirOffset), // Offset of start of central directory
		writeUInt16LE(0), // ZIP file comment length
	]);

	// Final ZIP file is the concatenation of the file data section,
	// the central directory, and the EOCD record.
	return Buffer.concat([fileDataSection, centralDirectory, eocd]);
}
