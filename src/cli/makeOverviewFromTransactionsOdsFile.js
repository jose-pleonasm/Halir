import { getConfig } from './private/getConfig.js';
import { makeOverviewFromTransactionsOdsFile } from '../main/makeOverviewFromTransactionsOdsFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsOdsFile(fileEncoding, process.argv[2], process.argv[3], 'degiro', config);
