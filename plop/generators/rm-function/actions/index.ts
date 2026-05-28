import type { ActionType, NodePlopAPI } from 'plop';

import removeFunction from './remove-function';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [removeFunction(plop)];
}
