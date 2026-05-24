import type { ActionType, NodePlopAPI } from 'plop';

import { DOMAIN_PATH } from '../constants';

export default function importIsUuid(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: DOMAIN_PATH,
      importName: 'IsUUID',
      from: 'class-validator',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.addValidator) {
        return 'IsUUID - validator is disabled';
      }
      if (!['uuid'].includes(answers.type)) {
        return 'IsUUID - property is not uuid';
      }
    },
  };
}
