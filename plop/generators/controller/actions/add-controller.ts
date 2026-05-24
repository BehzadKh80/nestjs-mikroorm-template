import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addController(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase name}}.controller.ts',
    templateFile: `${TEMPLATE_DIR}/controller.hbs`,
  };
}
