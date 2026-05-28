import type { ActionType, NodePlopAPI } from 'plop';

import addMethodImport from './add-method-import';
import appendRoute from './append-route';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [addMethodImport(plop), appendRoute(plop)];
}
