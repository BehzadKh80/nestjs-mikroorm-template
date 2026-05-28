import type { ActionType, NodePlopAPI } from 'plop';

import { RESOURCE_PATH, TEMPLATE_DIR } from '../constants';

export default function appendProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: RESOURCE_PATH,
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: `${TEMPLATE_DIR}/property.hbs`,
  };
}
