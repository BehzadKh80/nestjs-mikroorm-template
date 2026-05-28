import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';
import addBlockImportAction from './add-block-import';
import appendRouteArgumentAction from './append-route-argument';
import appendFunctionArgumentAction from './append-function-argument';
import removeBlockAction from './remove-block';
import removeBlockWithCleanupAction from './remove-block-with-cleanup';
import removePathAction from './remove-path';
import removeImportAction from './remove-import';
import cascadeInjectionAction from './cascade-injection';
import cascadeModuleDepAction from './cascade-module-dep';
import renameSymbolAction from './rename-symbol';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [
  addImportAction,
  addBlockImportAction,
  appendRouteArgumentAction,
  appendFunctionArgumentAction,
  removeBlockAction,
  removeBlockWithCleanupAction,
  removePathAction,
  removeImportAction,
  cascadeInjectionAction,
  cascadeModuleDepAction,
  renameSymbolAction,
];

export default actionTypes;
