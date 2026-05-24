import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importEnum(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: '{{pascalCase enumName}}',
      from: (answers: Record<string, any>) => {
        return answers.enumPath === 'new enum'
          ? 'src/modules/{{kebabCase moduleName}}/enums/{{kebabCase enumName}}.enum.ts'
          : answers.enumPath;
      },
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'enum') {
        return 'import enum - property is not enum';
      }
    },
  };
}
