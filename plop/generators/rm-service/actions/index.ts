import type { ActionType, NodePlopAPI } from 'plop';

import removeServiceFile from './remove-service-file';
import removeServiceSpecFile from './remove-service-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeServiceFile(plop),
    removeServiceSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
