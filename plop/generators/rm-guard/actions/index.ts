import type { ActionType, NodePlopAPI } from 'plop';

import removeGuardFile from './remove-guard-file';
import removeGuardSpecFile from './remove-guard-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
import cascadeInjection from './cascade-injection';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeInjection(plop),
    removeGuardFile(plop),
    removeGuardSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
