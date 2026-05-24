import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendModuleController(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'append',
    path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
    pattern: /\<controller \/\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/module-controller.hbs`,
  };
}
