import type { ActionType, NodePlopAPI } from 'plop';

import removeMiddlewareFile from './remove-middleware-file';
import removeMiddlewareSpecFile from './remove-middleware-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
import cascadeInjection from './cascade-injection';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeInjection(plop),
    removeMiddlewareFile(plop),
    removeMiddlewareSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
