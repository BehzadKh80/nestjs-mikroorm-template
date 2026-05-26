import type { ActionType, NodePlopAPI } from 'plop';

import { MODULE_FILE, TEMPLATE_DIR } from '../constants';

export default function addModuleImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'modify',
    path: MODULE_FILE,
    pattern: /^(?=\s*\/\/ \<\/imports\>)/m,
    templateFile: `${TEMPLATE_DIR}/module-import.hbs`,
    skip: (answers: Record<string, any>) => {
      if (answers.target !== 'module') {
        return 'add-module-import - target is not module';
      }
    },
  };
}
