import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addUpdateResponse(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/responses/update-{{kebabCase name}}.response.ts',
    templateFile: `${TEMPLATE_DIR}/update.response.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate update.resonse.hbs';
      }
    },
  };
}
