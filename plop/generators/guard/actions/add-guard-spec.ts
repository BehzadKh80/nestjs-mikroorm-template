import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addGuardSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.spec.ts',
    templateFile: `${TEMPLATE_DIR}/guard.spec.hbs`,
  };
}
