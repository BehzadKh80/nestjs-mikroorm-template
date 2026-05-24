import type { ActionType, NodePlopAPI } from 'plop';

import addController from './add-controller';
import addControllerSpec from './add-controller-spec';
import appendModuleImport from './append-module-import';
import appendModuleController from './append-module-controller';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addController(plop),
    addControllerSpec(plop),
    appendModuleImport(plop),
    appendModuleController(plop),
  ];
}
