import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { transformCsvFile } from '../main/transformCsvFile.js';

const { fileEncoding, ...config } = getConfig();

transformCsvFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
