import type { ActionType, NodePlopAPI } from 'plop';

import removeAppImport from './remove-app-import';
import removeAppDependency from './remove-app-dependency';
import removeModuleDir from './remove-module-dir';
import cascadeModuleDep from './cascade-module-dep';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    cascadeModuleDep(plop),
    removeAppImport(plop),
    removeAppDependency(plop),
    removeModuleDir(plop),
  ];
}
