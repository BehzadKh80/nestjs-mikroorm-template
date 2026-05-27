import type { ActionType, NodePlopAPI } from 'plop';

import addPipe from './add-pipe';
import addPipeSpec from './add-pipe-spec';
import appendModuleImport from './append-module-import';
import appendModuleProvider from './append-module-provider';
import appendModuleExport from './append-module-export';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addPipe(plop),
    addPipeSpec(plop),
    appendModuleImport(plop),
    appendModuleProvider(plop),
    appendModuleExport(plop),
  ];
}
