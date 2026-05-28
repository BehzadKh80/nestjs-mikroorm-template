import type { ActionType, NodePlopAPI } from 'plop';

import appendFunction from './append-function';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [appendFunction(plop)];
}
