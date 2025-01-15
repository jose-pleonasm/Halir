import { getConfig } from './private/getConfig.js';
import { csvToHstonFile } from '../core/csvToHstonFile.js';

const { fileEncoding, ...config } = getConfig();

csvToHstonFile(
	{
		config,
		profile: 'degiro',
	},
	fileEncoding,
	process.argv[2],
	process.argv[3],
);
