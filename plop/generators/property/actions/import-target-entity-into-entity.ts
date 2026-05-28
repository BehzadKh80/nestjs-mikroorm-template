import type { ActionType, NodePlopAPI } from 'plop';

import { ENTITY_PATH } from '../constants';

export default function importTargetEntityIntoEntity(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'addImport',
    data: {
      path: ENTITY_PATH,
      importName: '{{pascalCase targetEntity}}',
      from: (answers: Record<string, any>) => answers.targetEntityPath,
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'relation') {
        return 'import-target-entity (entity) - not a relation';
      }
      if (!answers.targetEntity || !answers.targetEntityPath) {
        return 'import-target-entity (entity) - missing target info';
      }
    },
  };
}
