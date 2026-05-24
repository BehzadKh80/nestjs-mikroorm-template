import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, NUMBER_TYPES } from '../constants';

export default function importMin(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'Min',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'Min - validator is disabled';
      }

      if (!NUMBER_TYPES.includes(answers.type)) {
        return 'Min - property is not number';
      } else if (answers.minNumber < 0) {
        return 'Min - value is less than zero';
      }
    },
  };
}
