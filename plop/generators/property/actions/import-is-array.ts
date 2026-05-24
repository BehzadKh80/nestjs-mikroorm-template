import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsArray(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsArray',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsArray - validator is disabled';
      }
      if (!answers.array) {
        return 'IsArray - property is not array';
      }
    },
  };
}
