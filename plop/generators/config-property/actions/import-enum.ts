import type { ActionType, NodePlopAPI } from 'plop';

import { RESOURCE_PATH } from '../constants';

export default function importEnum(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: RESOURCE_PATH,
      importName: '{{pascalCase enumName}}',
      from: (answers: Record<string, any>) => answers.enumPath,
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'enum') return 'import-enum - not enum type';
      if (!answers.enumName || !answers.enumPath) {
        return 'import-enum - enumName/enumPath missing';
      }
    },
  };
}
