import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendModuleImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
    pattern: /^(?=\s*\/\/ \<\/imports\>)/m,
    templateFile: `${TEMPLATE_DIR}/module-import.hbs`,
  };
}
