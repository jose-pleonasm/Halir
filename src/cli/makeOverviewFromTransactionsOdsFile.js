import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { makeOverviewFromTransactionsOdsFile } from '../main/node/makeOverviewFromTransactionsOdsFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsOdsFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
