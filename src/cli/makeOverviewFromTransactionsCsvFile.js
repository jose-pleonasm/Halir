import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { makeOverviewFromTransactionsCsvFile } from '../main/makeOverviewFromTransactionsCsvFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsCsvFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
