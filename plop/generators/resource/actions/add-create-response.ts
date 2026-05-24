import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addCreateResponse(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/responses/create-{{kebabCase name}}.response.ts',
    templateFile: `${TEMPLATE_DIR}/create.response.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate create.resonse.hbs';
      }
    },
  };
}
