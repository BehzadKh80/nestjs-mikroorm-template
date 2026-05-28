import type { ActionType, NodePlopAPI } from 'plop';

import { TARGET_PATH, TEMPLATE_DIR } from '../constants';

export default function appendFunction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: TARGET_PATH,
    pattern: /^(?=\s*\/\/ \<\/functions\>)/m,
    templateFile: `${TEMPLATE_DIR}/function.hbs`,
  };
}
