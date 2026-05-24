import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, STRING_TYPES } from '../constants';

export default function importMaxLength(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'MaxLength',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'MaxLength - validator is disabled';
      }
      if (!STRING_TYPES.includes(answers.type)) {
        return 'MaxLength - property is not string';
      } else if (answers.maxLength < 0) {
        return 'MaxLength - value is less than zero';
      }
    },
  };
}
