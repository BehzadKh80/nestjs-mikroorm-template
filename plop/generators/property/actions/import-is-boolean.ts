import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsBoolean(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsBoolean',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsBoolean - validator is disabled';
      }
      if (!['boolean'].includes(answers.type)) {
        return 'IsBoolean - property is not boolean';
      }
    },
  };
}
