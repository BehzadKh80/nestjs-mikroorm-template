import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addPipe(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.ts',
    templateFile: `${TEMPLATE_DIR}/pipe.hbs`,
  };
}
