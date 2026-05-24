import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addService(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase name}}.service.ts',
    templateFile: `${TEMPLATE_DIR}/service.hbs`,
  };
}
