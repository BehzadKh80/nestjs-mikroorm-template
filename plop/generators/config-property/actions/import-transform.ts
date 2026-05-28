import type { ActionType, NodePlopAPI } from 'plop';

import {
  CLASS_TRANSFORMER_PKG,
  RESOURCE_PATH,
} from '../constants';

export default function importTransform(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: RESOURCE_PATH,
      importName: 'Transform',
      from: CLASS_TRANSFORMER_PKG,
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type === 'url') return 'url type does not use Transform';
    },
  };
}
