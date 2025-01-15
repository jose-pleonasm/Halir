import { getConfig } from './private/getConfig.js';
import { csvToHstonFile } from '../core/csvToHstonFile.js';

const { fileEncoding, ...config } = getConfig();

csvToHstonFile(fileEncoding, process.argv[2], process.argv[3], {
	config,
	profile: 'degiro',
});
