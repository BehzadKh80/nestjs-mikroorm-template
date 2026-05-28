import type { ActionType, NodePlopAPI } from 'plop';

import removeRoute from './remove-route';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [removeRoute(plop)];
}
