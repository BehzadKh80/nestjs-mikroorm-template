import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addListResponse(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/responses/list-{{kebabCase name}}.response.ts',
    templateFile: `${TEMPLATE_DIR}/list.response.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate list.resonse.hbs';
      }
    },
  };
}
