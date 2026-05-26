import type { ActionType, NodePlopAPI } from 'plop';

import addGuard from './add-guard';
import addGuardSpec from './add-guard-spec';
import appendModuleImport from './append-module-import';
import appendModuleGuard from './append-module-guard';
import appendModuleExport from './append-module-export';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addGuard(plop),
    addGuardSpec(plop),
    appendModuleImport(plop),
    appendModuleGuard(plop),
    appendModuleExport(plop),
  ];
}
