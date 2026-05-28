import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importTargetEntityIntoDomain(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: '{{pascalCase targetEntity}}',
      from: (answers: Record<string, any>) => answers.targetEntityPath,
    },
    skip: (answers: Record<string, any>) => {
      if (answers.type !== 'relation') {
        return 'import-target-entity (domain) - not a relation';
      }
      if (!answers.targetEntity || !answers.targetEntityPath) {
        return 'import-target-entity (domain) - missing target info';
      }
    },
  };
}
