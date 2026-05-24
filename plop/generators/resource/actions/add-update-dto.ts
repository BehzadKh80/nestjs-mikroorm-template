import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addUpdateDto(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/dto/update-{{kebabCase name}}.dto.ts',
    templateFile: `${TEMPLATE_DIR}/update-dto.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate update-dto.hbs';
      }
    },
  };
}
