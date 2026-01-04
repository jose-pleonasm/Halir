import { makeId } from '../utils/makeId.js';
import { HALIR_VERSION_NS, HALIR_VERSION_PREFIX } from '../utils/constants.js';

const [_0, _1, ...args] = process.argv;

makeId({ ns: HALIR_VERSION_NS, prefix: HALIR_VERSION_PREFIX }, args.join('')).then((version) => console.log(version));
