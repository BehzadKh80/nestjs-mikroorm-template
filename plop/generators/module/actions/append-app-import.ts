import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendAppImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: 'src/modules/app/app.module.ts',
    pattern: /^(?=\s*\/\/ \<\/imports\>)/m,
    templateFile: `${TEMPLATE_DIR}/app-import.hbs`,
  };
}
