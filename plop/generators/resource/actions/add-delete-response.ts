import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addDeleteResponse(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/responses/delete-{{kebabCase name}}.response.ts',
    templateFile: `${TEMPLATE_DIR}/delete.response.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate delete.resonse.hbs';
      }
    },
  };
}
