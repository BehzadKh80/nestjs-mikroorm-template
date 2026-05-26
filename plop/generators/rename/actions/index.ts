import type { ActionType, NodePlopAPI } from 'plop';

import renameSymbolAction from './rename-symbol';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [renameSymbolAction(plop)];
}
