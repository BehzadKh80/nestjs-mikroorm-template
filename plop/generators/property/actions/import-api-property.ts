import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importApiProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'ApiProperty',
      from: 'src/common/decorators/api-property.decorator.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type === 'relation') {
        return 'import-api-property - relation does not use ApiProperty';
      }
    },
  };
}
