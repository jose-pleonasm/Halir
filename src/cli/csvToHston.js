import { getConfig } from './private/getConfig.js';
import { csvToHston } from '../core/csvToHston.js';

csvToHston({
	profile: 'degiro',
	config: getConfig(),
	inputFile: process.argv[2],
	outputFile: process.argv[3],
});
