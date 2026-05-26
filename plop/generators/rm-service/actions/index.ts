import type { ActionType, NodePlopAPI } from 'plop';

import removeServiceFile from './remove-service-file';
import removeServiceSpecFile from './remove-service-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
import cascadeInjection from './cascade-injection';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeInjection(plop),
    removeServiceFile(plop),
    removeServiceSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
