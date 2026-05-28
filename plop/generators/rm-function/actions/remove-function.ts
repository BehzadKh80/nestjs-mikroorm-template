import type { ActionType, NodePlopAPI } from 'plop';

import { TARGET_PATH } from '../constants';

export default function removeFunction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlockWithCleanup',
    data: {
      path: TARGET_PATH,
      tag: 'function',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-function - aborted by user';
    },
  };
}
