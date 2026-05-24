import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addServiceSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/services/{{kebabCase name}}.service.spec.ts',
    templateFile: `${TEMPLATE_DIR}/service.spec.hbs`,
  };
}
