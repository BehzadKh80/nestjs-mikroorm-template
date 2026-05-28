import type { ActionType, NodePlopAPI } from 'plop';

import { OPTIONS_PATH, TEMPLATE_DIR } from '../constants';

export default function appendOptionsProvider(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: OPTIONS_PATH,
    pattern: /^(?=\s*\/\/ \<\/providers\>)/m,
    templateFile: `${TEMPLATE_DIR}/options-provider.hbs`,
  };
}
