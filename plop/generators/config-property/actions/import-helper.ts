import type { ActionType, NodePlopAPI } from 'plop';

import { HELPERS_PATH, RESOURCE_PATH } from '../constants';

const HELPER_BY_TYPE: Record<string, string> = {
  string: 'transformString',
  number: 'transformNumber',
  boolean: 'transformBoolean',
};

export default function importHelper(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: RESOURCE_PATH,
      importName: (answers: Record<string, any>) =>
        HELPER_BY_TYPE[answers.type] ?? '',
      from: HELPERS_PATH,
    },
    skip: (answers: Record<string, any>) => {
      if (!HELPER_BY_TYPE[answers.type]) {
        return `import-helper - no transform helper needed for ${String(answers.type)}`;
      }
    },
  };
}
