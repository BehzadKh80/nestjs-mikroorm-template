import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addProvider(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.ts',
    templateFile: `${TEMPLATE_DIR}/provider.hbs`,
  };
}
