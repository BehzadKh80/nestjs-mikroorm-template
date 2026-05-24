import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addDomain(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/domains/{{kebabCase name}}.ts',
    templateFile: `${TEMPLATE_DIR}/domain.hbs`,
  };
}
