import type { ActionType, NodePlopAPI } from 'plop';

import { DTO_PATH } from '../constants';

export default function importApiProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DTO_PATH,
      importName: 'ApiProperty',
      from: 'src/common/decorators/api-property.decorator.ts',
    },
  };
}
