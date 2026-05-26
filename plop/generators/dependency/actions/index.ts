import type { ActionType, NodePlopAPI } from 'plop';

import addModuleImport from './add-module-import';
import addModuleDependency from './add-module-dependency';
import addClassImport from './add-class-import';
import addConstructorProperty from './add-constructor-property';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addModuleImport(plop),
    addModuleDependency(plop),
    addClassImport(plop),
    addConstructorProperty(plop),
  ];
}
