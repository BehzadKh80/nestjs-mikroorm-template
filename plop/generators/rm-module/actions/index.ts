import type { ActionType, NodePlopAPI } from 'plop';

import removeAppImport from './remove-app-import';
import removeAppDependency from './remove-app-dependency';
import removeModuleDir from './remove-module-dir';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeAppImport(plop),
    removeAppDependency(plop),
    removeModuleDir(plop),
  ];
}
