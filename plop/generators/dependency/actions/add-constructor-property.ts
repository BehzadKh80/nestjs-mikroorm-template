import type { ActionType, NodePlopAPI } from 'plop';

import { TARGET_FILE, TEMPLATE_DIR } from '../constants';

export default function addConstructorProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'modify',
    path: TARGET_FILE,
    pattern: /^(?=\s*\/\/ \<\/properties\>)/m,
    templateFile: `${TEMPLATE_DIR}/constructor-property.hbs`,
    skip: (answers: Record<string, any>) => {
      if (answers.target === 'module') {
        return 'add-constructor-property - target is module';
      }
    },
  };
}
