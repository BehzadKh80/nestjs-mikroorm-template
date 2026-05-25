import type { ActionType, NodePlopAPI } from 'plop';

import removeControllerFile from './remove-controller-file';
import removeControllerSpecFile from './remove-controller-spec-file';
import removeModuleController from './remove-module-controller';
import removeModuleImport from './remove-module-import';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeControllerFile(plop),
    removeControllerSpecFile(plop),
    removeModuleController(plop),
    removeModuleImport(plop),
  ];
}
