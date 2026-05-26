import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';
import removeBlockAction from './remove-block';
import removePathAction from './remove-path';
import removeImportAction from './remove-import';
import cascadeInjectionAction from './cascade-injection';
import cascadeModuleDepAction from './cascade-module-dep';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [
  addImportAction,
  removeBlockAction,
  removePathAction,
  removeImportAction,
  cascadeInjectionAction,
  cascadeModuleDepAction,
];

export default actionTypes;
