import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_PATH, TEMPLATE_DIR } from '../constants';

export default function appendRoute(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: CONTROLLER_PATH,
    pattern: /^(?=\s*\/\/ \<\/routes\>)/m,
    templateFile: `${TEMPLATE_DIR}/route.hbs`,
  };
}
