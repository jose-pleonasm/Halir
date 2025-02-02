import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { makeOverviewFromTransactionsEnhancedCsvFile } from '../main/makeOverviewFromTransactionsEnhancedCsvFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsEnhancedCsvFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
