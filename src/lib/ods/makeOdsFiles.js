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
// Example: Calculate the value of a reference cell before output.
// This is a naive example—you’ll need a full evaluation engine for complex formulas.
function tryToGetCellValue(sheetData, cellRef) {
	try {
		// Assuming cellRef is of the form '.C2' (i.e. column letter and row number)
		// Convert column letter to index (A -> 0, B -> 1, ...)
		const match = cellRef.match(/\.([A-Z]+)(\d+)/);
		if (!match) {
			return null;
		}

		const [, colLetters, rowStr] = match;
		const rowIndex = parseInt(rowStr, 10) - 1; // zero-indexed row
		let colIndex = 0;
		for (let i = 0; i < colLetters.length; i++) {
			colIndex = colIndex * 26 + (colLetters.charCodeAt(i) - 65 + 1);
		}
		colIndex--; // zero-indexed column

		if (sheetData[rowIndex] && sheetData[rowIndex][colIndex] !== undefined) {
			const cell = sheetData[rowIndex][colIndex];
			return typeof cell === 'object' && cell.hasOwnProperty('value') ? cell.value : cell;
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @typedef {Object} OdsFileContainer
 * @property {string} name
 * @property {string} data
 *
 */

/**
 * Create a minimal ODS file.
 *
 * @param {Array<Array<string>>} sheetData - 2D array representing the first sheet's cells.
 * @returns {Promise<Array<OdsFileContainer>>} - Set of ODS files.
 */
export async function makeOdsFiles(sheetData) {
	if (!Array.isArray(sheetData)) {
		throw new InvalidParamError('sheetData', { source: makeOdsFiles.name, value: sheetData });
	}

	// Build content.xml dynamically.
	let rowsXml = '';
	for (let row of sheetData) {
		let cellsXml = '';
		for (let cell of row) {
			if (cell !== null && typeof cell === 'object' && cell.hasOwnProperty('formula')) {
				let formula = cell.formula;
				if (!formula.startsWith('of:=')) {
					formula = 'of:=' + formula;
				}
				// For a simple reference like "of:=[.C2]", we can try to extract the referenced cell.
				let computedValue = cell.value;
				const refMatch = formula.match(/of:=\[(\.[A-Z]+\d+)\]/);
				if (refMatch && computedValue === undefined) {
					// Try to compute the value from the sheetData
					const ref = refMatch[1]; // e.g., ".C2"
					computedValue = tryToGetCellValue(sheetData, ref);
				}
				const isNumeric = typeof computedValue === 'number';
				const valueType = cell.type ? cell.type : isNumeric ? 'float' : 'string';
				cellsXml += `<table:table-cell table:formula="${formula}" office:value-type="${valueType}"${isNumeric ? ` office:value="${computedValue}"` : ''} calcext:value-type="${valueType}"><text:p>${computedValue}</text:p></table:table-cell>`;
			} else {
				// Normal cell handling...
				const cellText = cell !== null ? cell.toString() : '';
				cellsXml += `<table:table-cell office:value-type="string"><text:p>${cellText}</text:p></table:table-cell>`;
			}
		}
		rowsXml += `<table:table-row>${cellsXml}</table:table-row>`;
	}

	const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content 
    	xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
	xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
	xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
	xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
	xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
	xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
	xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"
	xmlns:presentation="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0"
	xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
	xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0"
	xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0"
	xmlns:math="http://www.w3.org/1998/Math/MathML"
	xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0"
	xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0"
	xmlns:ooo="http://openoffice.org/2004/office"
	xmlns:ooow="http://openoffice.org/2004/writer"
	xmlns:oooc="http://openoffice.org/2004/calc"
	xmlns:dom="http://www.w3.org/2001/xml-events"
	xmlns:xforms="http://www.w3.org/2002/xforms"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:rpt="http://openoffice.org/2005/report"
	xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:grddl="http://www.w3.org/2003/g/data-view#"
	xmlns:tableooo="http://openoffice.org/2009/table"
	xmlns:drawooo="http://openoffice.org/2010/draw"
	xmlns:calcext="urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0"
	xmlns:loext="urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0"
	xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0"
	xmlns:formx="urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0"
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
    <meta:generator>Minimal ODS Generator with Formula Support</meta:generator>
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
			data: mimetype,
		},
		{
			name: 'content.xml',
			data: contentXml,
		},
		{
			name: 'styles.xml',
			data: stylesXml,
		},
		{
			name: 'meta.xml',
			data: metaXml,
		},
		{
			name: 'settings.xml',
			data: settingsXml,
		},
		{
			name: 'META-INF/manifest.xml',
			data: manifestXml,
		},
	];

	return files;
}
