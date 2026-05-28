import type { ActionType, NodePlopAPI } from 'plop';

import { RESOURCE_PATH, TEMPLATE_DIR } from '../constants';

export default function addResourceFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'add',
    path: RESOURCE_PATH,
    templateFile: `${TEMPLATE_DIR}/resource.hbs`,
  };
}
