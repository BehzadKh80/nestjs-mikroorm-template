import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importApiProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'ApiProperty',
      from: '@nestjs/swagger',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.swagger) {
        return 'ApiProperty - swagger is disabled';
      }
      if (answers.nullable) {
        return 'ApiProperty - property is optional';
      }
    },
  };
}
