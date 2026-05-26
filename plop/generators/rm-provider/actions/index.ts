import type { ActionType, NodePlopAPI } from 'plop';

import removeProviderFile from './remove-provider-file';
import removeProviderSpecFile from './remove-provider-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeProviderFile(plop),
    removeProviderSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
