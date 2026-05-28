import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importCollection(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'Collection',
      from: '@mikro-orm/core',
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'relation') {
        return 'import-collection - not a relation';
      }
      if (
        answers.relationKind !== 'oneToMany' &&
        answers.relationKind !== 'manyToMany'
      ) {
        return 'import-collection - relation is single-valued';
      }
    },
  };
}
