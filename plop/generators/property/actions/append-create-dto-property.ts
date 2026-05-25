import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendCreateDtoProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'modify',
    path: 'src/modules/{{kebabCase moduleName}}/dto/create-{{kebabCase entityName}}.dto.ts',
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: `${TEMPLATE_DIR}/create-dto-property.hbs`,
  };
}
