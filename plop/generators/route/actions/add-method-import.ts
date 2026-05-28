import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_PATH } from '../constants';

export default function addMethodImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addBlockImport',
    data: {
      path: CONTROLLER_PATH,
      importName: '{{pascalCase method}}',
      from: '@nestjs/common',
    },
  };
}
