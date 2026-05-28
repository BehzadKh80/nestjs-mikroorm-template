import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addDto(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/dto/{{kebabCase name}}.dto.ts',
    templateFile: `${TEMPLATE_DIR}/dto.hbs`,
  };
}
