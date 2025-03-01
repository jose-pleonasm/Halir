import { uuidV5 } from '../lib/uuid/v5.js';
import { makeOdsFiles } from '../lib/ods/makeOdsFiles.js';

export const getTestLib = () => ({ uuidV5, makeOdsFiles, makeZip: async () => '' });
