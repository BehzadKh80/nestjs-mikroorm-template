import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addEntity(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/entities/{{kebabCase name}}.entity.ts',
    templateFile: `${TEMPLATE_DIR}/entity.hbs`,
  };
}
