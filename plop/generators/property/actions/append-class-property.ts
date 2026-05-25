import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, TEMPLATE_DIR } from '../constants';

export default function appendClassProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: DOMAIN_PATH,
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: `${TEMPLATE_DIR}/class-property.hbs`,
  };
}
