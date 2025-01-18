import { getConfig } from './private/getConfig.js';
import { hstonToCsvFile } from '../core/hstonToCsvFile.js';

const { fileEncoding, ...config } = getConfig();

hstonToCsvFile(fileEncoding, process.argv[2], process.argv[3], config);
