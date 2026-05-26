import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';
import removeBlockAction from './remove-block';
import removePathAction from './remove-path';
import removeImportAction from './remove-import';
import cascadeInjectionAction from './cascade-injection';
import cascadeModuleDepAction from './cascade-module-dep';
import renameSymbolAction from './rename-symbol';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [
  addImportAction,
  removeBlockAction,
  removePathAction,
  removeImportAction,
  cascadeInjectionAction,
  cascadeModuleDepAction,
  renameSymbolAction,
];

export default actionTypes;
