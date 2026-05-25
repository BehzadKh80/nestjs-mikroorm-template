import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';
import removeBlockAction from './remove-block';
import removePathAction from './remove-path';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [
  addImportAction,
  removeBlockAction,
  removePathAction,
];

export default actionTypes;
