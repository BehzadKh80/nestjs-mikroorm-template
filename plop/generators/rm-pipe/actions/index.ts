import type { ActionType, NodePlopAPI } from 'plop';

import removePipeFile from './remove-pipe-file';
import removePipeSpecFile from './remove-pipe-spec-file';
import removeModuleProvider from './remove-module-provider';
import removeModuleImport from './remove-module-import';
import removeModuleExport from './remove-module-export';
import cascadeInjection from './cascade-injection';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeInjection(plop),
    removePipeFile(plop),
    removePipeSpecFile(plop),
    removeModuleProvider(plop),
    removeModuleImport(plop),
    removeModuleExport(plop),
  ];
}
