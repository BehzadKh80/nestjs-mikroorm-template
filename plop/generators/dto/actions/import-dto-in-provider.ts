import type { ActionType, NodePlopAPI } from 'plop';

import { PROVIDER_PATH } from '../constants';

export default function importDtoInProvider(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: PROVIDER_PATH,
      importName: '{{pascalCase name}}Dto',
      from: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase name}}.dto.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'provider') {
        return 'import-dto-in-provider - dto is not used in a provider';
      }
    },
  };
}
