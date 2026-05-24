import type { ActionType, NodePlopAPI } from 'plop';

import { DATE_TYPES, DOMAIN_PATH } from '../constants';

export default function importIsDate(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsDate',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsDate - validator is disabled';
      }
      if (!DATE_TYPES.includes(answers.type)) {
        return 'IsDate - property is not date';
      }
    },
  };
}
