import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function addProviderSpec(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.spec.ts',
    templateFile: `${TEMPLATE_DIR}/provider.spec.hbs`,
  };
}
