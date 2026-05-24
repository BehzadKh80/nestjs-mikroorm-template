import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, STRING_TYPES } from '../constants';

export default function importMinLength(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'MinLength',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'MinLength - validator is disabled';
      }
      if (!STRING_TYPES.includes(answers.type)) {
        return 'MinLength - property is not string';
      } else if (answers.minLength < 0) {
        return 'MinLength - value is less than zero';
      }
    },
  };
}
