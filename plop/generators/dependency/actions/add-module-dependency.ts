import type { ActionType, NodePlopAPI } from 'plop';

import { MODULE_FILE, TEMPLATE_DIR } from '../constants';

export default function addModuleDependency(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: MODULE_FILE,
    pattern: /^(?=\s*\/\/ \<\/dependencies\>)/m,
    templateFile: `${TEMPLATE_DIR}/module-dependency.hbs`,
    skip: (answers: Record<string, any>) => {
      if (answers.target !== 'module') {
        return 'add-module-dependency - target is not module';
      }
    },
  };
}
