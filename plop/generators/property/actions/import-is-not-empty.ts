import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsNotEmpty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsNotEmpty',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsNotEmpty - validator is disabled';
      }
      if (answers.nullable) {
        return 'IsNotEmpty - property is optional';
      }
    },
  };
}
