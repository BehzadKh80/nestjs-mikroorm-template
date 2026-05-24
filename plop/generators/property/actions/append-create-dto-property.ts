import type { ActionType, NodePlopAPI } from 'plop';

import { TEMPLATE_DIR } from '../constants';

export default function appendCreateDtoProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'append',
    path: 'src/modules/{{kebabCase moduleName}}/dto/create-{{kebabCase entityName}}.dto.ts',
    pattern: /\<property \/\>/,
    unique: true,
    templateFile: `${TEMPLATE_DIR}/create-dto-property.hbs`,
  };
}
