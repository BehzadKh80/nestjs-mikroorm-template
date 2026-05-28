import type { ActionType, NodePlopAPI } from 'plop';

import { DTO_PATH, PROPERTY_TEMPLATE } from '../constants';

export default function appendDtoProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: DTO_PATH,
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: PROPERTY_TEMPLATE,
  };
}
