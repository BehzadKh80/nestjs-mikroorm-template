import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, STRING_TYPES } from '../constants';

export default function importFormat(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'Is{{format}}',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return `${answers.format} - validator is disabled`;
      }
      if (!STRING_TYPES.includes(answers.type)) {
        return `${answers.format} - property is not string`;
      } else if (answers.format === 'skip') {
        return `${answers.format} - value is less than zero`;
      }
    },
  };
}
