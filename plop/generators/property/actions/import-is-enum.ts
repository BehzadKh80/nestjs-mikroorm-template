import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsEnum(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsEnum',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsEnum - validator is disabled';
      }
      if (answers.type !== 'enum') {
        return 'IsEnum - property is not enum';
      }
    },
  };
}
