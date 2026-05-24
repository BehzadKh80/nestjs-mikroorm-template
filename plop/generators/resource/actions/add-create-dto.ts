import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addCreateDto(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
    templateFile: `${TEMPLATE_DIR}/create-dto.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate create-dto.hbs';
      }
    },
  };
}
