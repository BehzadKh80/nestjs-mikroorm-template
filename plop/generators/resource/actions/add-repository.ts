import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addRepository(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase name}}/repositories/{{kebabCase name}}.repository.ts',
    templateFile: `${TEMPLATE_DIR}/repository.hbs`,
  };
}
