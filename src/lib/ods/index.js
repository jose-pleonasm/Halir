import { Buffer } from 'buffer';
import { createZip } from './zip.js';
import { InvalidParamError } from '../../error/InvalidParamError.js';

// This module creates an ODS file as a ZIP archive containing these files:
//   - mimetype (must be the first file and stored uncompressed)
//   - content.xml
//   - styles.xml
//   - meta.xml
//   - settings.xml
//   - META-INF/manifest.xml
//

// For simplicity the XML files are “minimal”. (For production use, you’d need to be more robust.)

/**
 * Create a minimal ODS file.
 *
 * @param {Array<Array<string>>} sheetData - 2D array representing the first sheet's cells.
 * @returns {Buffer} - A Buffer containing the complete ODS file.
 */
export function makeOds(sheetData) {
	if (!Array.isArray(sheetData)) {
		throw new InvalidParamError('sheetData', { source: makeOds.name, value: sheetData });
	}

	// Build content.xml dynamically based on sheetData.
	// This is a very minimal implementation.
	let rowsXml = '';
	for (let row of sheetData) {
		let cellsXml = '';
		for (let cell of row) {
			cellsXml += `<table:table-cell office:value-type="string"><text:p>${cell}</text:p></table:table-cell>`;
		}
		rowsXml += `<table:table-row>${cellsXml}</table:table-row>`;
	}

	const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content 
    xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
    xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
    office:version="1.2">
  <office:body>
    <office:spreadsheet>
      <table:table table:name="Sheet1">
        ${rowsXml}
      </table:table>
    </office:spreadsheet>
  </office:body>
</office:document-content>`;

	const stylesXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles 
    xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    office:version="1.2">
  <office:styles></office:styles>
  <office:automatic-styles></office:automatic-styles>
  <office:master-styles></office:master-styles>
</office:document-styles>`;

	const metaXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta 
    xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
    office:version="1.2">
  <office:meta>
    <meta:generator>Minimal ODS Generator</meta:generator>
  </office:meta>
</office:document-meta>`;

	const settingsXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-settings 
    xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    office:version="1.2">
  <office:settings></office:settings>
</office:document-settings>`;

	const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest 
    xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" 
    manifest:version="1.2" 
    manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="settings.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

	// The mimetype file must be the first entry in the ZIP and stored uncompressed.
	const mimetype = 'application/vnd.oasis.opendocument.spreadsheet';

	// Build our files array.
	const files = [
		{
			name: 'mimetype',
			data: Buffer.from(mimetype, 'utf8'),
		},
		{
			name: 'content.xml',
			data: Buffer.from(contentXml, 'utf8'),
		},
		{
			name: 'styles.xml',
			data: Buffer.from(stylesXml, 'utf8'),
		},
		{
			name: 'meta.xml',
			data: Buffer.from(metaXml, 'utf8'),
		},
		{
			name: 'settings.xml',
			data: Buffer.from(settingsXml, 'utf8'),
		},
		{
			name: 'META-INF/manifest.xml',
			data: Buffer.from(manifestXml, 'utf8'),
		},
	];

	// Create the ZIP archive (our ODS file).
	return createZip(files);
}
