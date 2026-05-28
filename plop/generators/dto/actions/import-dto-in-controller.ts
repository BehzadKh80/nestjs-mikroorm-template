import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_PATH } from '../constants';

export default function importDtoInController(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addBlockImport',
    data: {
      path: CONTROLLER_PATH,
      importName: '{{pascalCase name}}Dto',
      from: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase name}}.dto.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'controller') {
        return 'import-dto-in-controller - dto is not used in a controller';
      }
    },
  };
}
