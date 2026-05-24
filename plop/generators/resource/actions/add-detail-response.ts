import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addDetailResponse(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/responses/detail-{{kebabCase name}}.response.ts',
    templateFile: `${TEMPLATE_DIR}/detail.response.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.genCRUD) {
        return 'skip generate detail.resonse.hbs';
      }
    },
  };
}
