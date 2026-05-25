import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendAppImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'append',
    path: 'src/modules/app/app.module.ts',
    pattern: /\/\/ \<imports\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/app-import.hbs`,
  };
}
