import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addGuard(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.ts',
    templateFile: `${TEMPLATE_DIR}/guard.hbs`,
  };
}
