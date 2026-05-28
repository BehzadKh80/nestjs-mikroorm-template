import type { ActionType, NodePlopAPI } from 'plop';

import { ENUM_TEMPLATE } from '../constants';

export default function addEnum(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/enums/{{kebabCase enumName}}.enum.ts',
    templateFile: ENUM_TEMPLATE,
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'enum') {
        return 'new enum - property is not enum';
      }
      if (answers.enumPath !== 'new enum') {
        return 'enum class exists';
      }
    },
  };
}
