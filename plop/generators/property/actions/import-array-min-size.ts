import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importArrayMinSize(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'ArrayMinSize',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'ArrayMinSize - validator is disabled';
      }
      if (!answers.array) {
        return 'ArrayMinSize - property is not array';
      } else if (answers.minItems < 0) {
        return 'ArrayMinSize - value is less than zero';
      }
    },
  };
}
