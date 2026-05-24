import type { ActionType, NodePlopAPI } from 'plop';

import { ENTITY_PATH } from '../constants';

export default function importP(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: ENTITY_PATH,
      importName: 'p',
      from: '@mikro-orm/core',
    },
  };
}
