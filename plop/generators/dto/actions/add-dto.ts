import type { ActionType, NodePlopAPI } from 'plop';

import { DTO_PATH, TEMPLATE_DIR } from '../constants';

export default function addDto(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: DTO_PATH,
    templateFile: `${TEMPLATE_DIR}/dto.hbs`,
  };
}
