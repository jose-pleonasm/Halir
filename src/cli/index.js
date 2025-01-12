import { getConfig } from './getConfig.js';
import { main } from '../main.js';

main({
	profile: 'degiro',
	getConfig: getConfig,
	inputFile: process.argv[2],
	outputFile: process.argv[3],
});
