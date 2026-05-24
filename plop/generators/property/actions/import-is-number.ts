import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, NUMBER_TYPES } from '../constants';

export default function importIsNumber(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsNumber',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsNumber - validator is disabled';
      }
      if (!NUMBER_TYPES.includes(answers.type)) {
        return 'IsNumber - property is not number';
      }
    },
  };
}
