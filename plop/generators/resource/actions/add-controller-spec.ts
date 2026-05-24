import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addControllerSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/controllers/{{kebabCase name}}.controller.spec.ts',
    templateFile: `${TEMPLATE_DIR}/controller.spec.hbs`,
  };
}
