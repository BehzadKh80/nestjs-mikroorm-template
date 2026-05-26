import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';
import removeBlockAction from './remove-block';
import removePathAction from './remove-path';
import removeImportAction from './remove-import';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [
  addImportAction,
  removeBlockAction,
  removePathAction,
  removeImportAction,
];

export default actionTypes;
