import { getConfig } from './private/getConfig.js';
import * as lib from '../lib/index.js';
import { makeOverviewFromTransactionsFile } from '../main/node/makeOverviewFromTransactionsFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsFile(fileEncoding, process.argv[2], process.argv[3], lib, 'degiro', config);
