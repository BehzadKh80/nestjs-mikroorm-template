import type { ActionType, NodePlopAPI } from 'plop';

import { ENTITY_PATH, TEMPLATE_DIR } from '../constants';

export default function appendEntityProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: ENTITY_PATH,
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: `${TEMPLATE_DIR}/entity-property.hbs`,
  };
}
