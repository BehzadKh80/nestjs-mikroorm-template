import type { ActionType, NodePlopAPI } from 'plop';

import { DEP_CLASS, DEP_IMPORT_PATH, TARGET_FILE } from '../constants';

export default function addClassImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: TARGET_FILE,
      importName: DEP_CLASS,
      from: DEP_IMPORT_PATH,
    },
    skip: (answers: Record<string, any>) => {
      if (answers.target === 'module') {
        return 'add-class-import - target is module';
      }
    },
  };
}
