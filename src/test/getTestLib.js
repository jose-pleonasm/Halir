import { uuidV5 } from '../lib/uuid/v5.js';
import { makeOdsFiles } from '../lib/ods/makeOdsFiles.js';
import { makeZip } from '../lib/zip/makeZip.js';

export const getTestLib = () => ({ uuidV5, makeOdsFiles, makeZip });
