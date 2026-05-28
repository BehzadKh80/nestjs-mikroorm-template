import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_PATH } from '../constants';

export default function removeRoute(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlockWithCleanup',
    data: {
      path: CONTROLLER_PATH,
      tag: 'route',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-route - aborted by user';
    },
  };
}
