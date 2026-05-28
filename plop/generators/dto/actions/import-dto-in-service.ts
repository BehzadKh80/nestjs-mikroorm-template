import type { ActionType, NodePlopAPI } from 'plop';

import { SERVICE_PATH } from '../constants';

export default function importDtoInService(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: SERVICE_PATH,
      importName: '{{pascalCase name}}Dto',
      from: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase name}}.dto.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'service') {
        return 'import-dto-in-service - dto is not used in a service';
      }
    },
  };
}
