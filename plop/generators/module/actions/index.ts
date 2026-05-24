import type { ActionType, NodePlopAPI } from 'plop';

import addModule from './add-module';
import appendAppImport from './append-app-import';
import appendAppModule from './append-app-module';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [addModule(plop), appendAppImport(plop), appendAppModule(plop)];
}
