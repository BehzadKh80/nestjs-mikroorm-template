import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendModuleProvider(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
    pattern: /^(?=\s*\/\/ \<\/providers\>)/m,
    templateFile: `${TEMPLATE_DIR}/module-provider.hbs`,
  };
}
