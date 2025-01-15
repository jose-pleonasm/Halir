import { getConfig } from './private/getConfig.js';
import { csvToHstom } from '../core/csvToHstom.js';

csvToHstom({
	profile: 'degiro',
	config: getConfig(),
	inputFile: process.argv[2],
	outputFile: process.argv[3],
});
