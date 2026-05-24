import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, STRING_TYPES } from '../constants';

export default function importIsString(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsString',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsString - validator is disabled';
      }
      if (!STRING_TYPES.includes(answers.type)) {
        return 'IsString - property is not string';
      }
    },
  };
}
