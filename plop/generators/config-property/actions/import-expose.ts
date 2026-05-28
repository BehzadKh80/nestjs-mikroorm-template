import type { ActionType, NodePlopAPI } from 'plop';

import {
  CLASS_TRANSFORMER_PKG,
  RESOURCE_PATH,
} from '../constants';

export default function importExpose(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: RESOURCE_PATH,
      importName: 'Expose',
      from: CLASS_TRANSFORMER_PKG,
    },
  };
}
