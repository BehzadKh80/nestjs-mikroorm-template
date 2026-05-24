import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addModule(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
    templateFile: `${TEMPLATE_DIR}/module.hbs`,
  };
}
