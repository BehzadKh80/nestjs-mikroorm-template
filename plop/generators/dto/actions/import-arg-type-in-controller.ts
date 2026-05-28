import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_PATH } from '../constants';

export default function importArgTypeInController(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'addBlockImport',
    data: {
      path: CONTROLLER_PATH,
      importName: '{{pascalCase argType}}',
      from: '@nestjs/common',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'controller') {
        return 'import-arg-type-in-controller - dto is not used in a controller';
      }
    },
  };
}
