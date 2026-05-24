import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importArrayMaxSize(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'ArrayMaxSize',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'ArrayMaxSize - validator is disabled';
      }
      if (!answers.array) {
        return 'ArrayMaxSize - property is not array';
      } else if (answers.maxItems < 0) {
        return 'ArrayMaxSize - value is less than zero';
      }
    },
  };
}
