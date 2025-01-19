import { getConfig } from './private/getConfig.js';
import { makeOverviewFromTransactionsCsvFile } from '../core/makeOverviewFromTransactionsCsvFile.js';

const { fileEncoding, ...config } = getConfig();

makeOverviewFromTransactionsCsvFile(fileEncoding, process.argv[2], process.argv[3], 'degiro', config);
