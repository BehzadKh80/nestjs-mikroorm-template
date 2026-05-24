import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, NUMBER_TYPES } from '../constants';

export default function importMax(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'Max',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'Max - validator is disabled';
      }
      if (!NUMBER_TYPES.includes(answers.type)) {
        return 'Max - property is not number';
      } else if (answers.maxNumber < 0) {
        return 'Max - value is less than zero';
      }
    },
  };
}
