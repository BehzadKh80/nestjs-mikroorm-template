import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendModuleImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'append',
    path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
    pattern: /\/\/ \<imports\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/module-import.hbs`,
  };
}
