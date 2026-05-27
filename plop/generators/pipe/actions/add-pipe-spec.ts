import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addPipeSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.spec.ts',
    templateFile: `${TEMPLATE_DIR}/pipe.spec.hbs`,
  };
}
