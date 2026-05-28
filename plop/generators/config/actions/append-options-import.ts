import type { ActionType, NodePlopAPI } from 'plop';

import { OPTIONS_PATH, TEMPLATE_DIR } from '../constants';

export default function appendOptionsImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: OPTIONS_PATH,
    pattern: /^(?=\s*\/\/ \<\/imports\>)/m,
    templateFile: `${TEMPLATE_DIR}/options-import.hbs`,
  };
}
