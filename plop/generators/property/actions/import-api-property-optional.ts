import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importApiPropertyOptional(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'ApiPropertyOptional',
      from: '@nestjs/swagger',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.swagger) {
        return 'ApiPropertyOptional - swagger is disabled';
      }
      if (!answers.nullable) {
        return 'ApiPropertyOptional - property is not optional';
      }
    },
  };
}
