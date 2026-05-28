import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addMiddlewareSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/middlewares/{{kebabCase name}}.middleware.spec.ts',
    templateFile: `${TEMPLATE_DIR}/middleware.spec.hbs`,
  };
}
