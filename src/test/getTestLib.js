import { v5 as uuidV5 } from 'uuid';
import { makeOdsFiles } from '../lib/ods/makeOdsFiles.js';

export const getTestLib = () => ({ uuidV5, makeOdsFiles, makeZip: async () => '' });
