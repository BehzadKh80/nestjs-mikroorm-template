import type { ActionType, NodePlopAPI } from 'plop';

import removeProviderFile from './remove-provider-file';
import removeProviderSpecFile from './remove-provider-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
import cascadeInjection from './cascade-injection';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeInjection(plop),
    removeProviderFile(plop),
    removeProviderSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
