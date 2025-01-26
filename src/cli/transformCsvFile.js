import { getConfig } from './private/getConfig.js';
import { transformCsvFile } from '../main/transformCsvFile.js';

const { fileEncoding, ...config } = getConfig();

transformCsvFile(fileEncoding, process.argv[2], process.argv[3], 'degiro', config);
