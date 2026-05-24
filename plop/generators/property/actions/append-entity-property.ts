import type { ActionType, NodePlopAPI } from 'plop';

import { ENTITY_PATH, TEMPLATE_DIR } from '../constants';

export default function appendEntityProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'append',
    path: ENTITY_PATH,
    pattern: /\<entity-property \/\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/entity-property.hbs`,
  };
}
