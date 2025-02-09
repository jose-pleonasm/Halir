import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { csvToHstonFile } from '../main/node/csvToHstonFile.js';

const { fileEncoding, ...config } = getConfig();

csvToHstonFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
