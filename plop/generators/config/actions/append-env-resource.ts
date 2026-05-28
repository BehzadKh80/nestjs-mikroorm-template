import type { ActionType, NodePlopAPI } from 'plop';

import { ENV_PATH, TEMPLATE_DIR } from '../constants';

export default function appendEnvResource(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: ENV_PATH,
    pattern: /^(?=# \<\/resources\>)/m,
    templateFile: `${TEMPLATE_DIR}/env-resource.hbs`,
  };
}
