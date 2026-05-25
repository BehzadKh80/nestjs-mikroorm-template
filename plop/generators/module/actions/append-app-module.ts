import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendAppModule(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: 'src/modules/app/app.module.ts',
    pattern: /^(?=\s*\/\/ \<\/dependencies\>)/m,
    templateFile: `${TEMPLATE_DIR}/app-module.hbs`,
  };
}
