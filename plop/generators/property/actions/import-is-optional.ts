import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsOptional(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsOptional',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsOptional - validator is disabled';
      }
      if (!answers.nullable) {
        return 'IsOptional - property is not optional';
      }
    },
  };
}
