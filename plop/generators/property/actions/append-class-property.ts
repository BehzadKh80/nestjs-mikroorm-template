import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH, TEMPLATE_DIR } from '../constants';

export default function appendClassProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'append',
    path: DOMAIN_PATH,
    pattern: /\/\/ \<properties\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/class-property.hbs`,
  };
}
