import type { ActionType, NodePlopAPI } from 'plop';

import { CLASS_VALIDATOR_PKG, RESOURCE_PATH } from '../constants';

const VALIDATOR_BY_TYPE: Record<string, string> = {
  string: 'IsString',
  number: 'IsNumber',
  boolean: 'IsBoolean',
  url: 'IsUrl',
  enum: 'IsEnum',
};

export default function importValidator(_plop: NodePlopAPI): ActionType {
  return {
    type: 'addImport',
    data: {
      path: RESOURCE_PATH,
      importName: (answers: Record<string, any>) =>
        VALIDATOR_BY_TYPE[answers.type] ?? '',
      from: CLASS_VALIDATOR_PKG,
    },
    skip: (answers: Record<string, any>) => {
      if (!VALIDATOR_BY_TYPE[answers.type]) {
        return `import-validator - unknown type ${String(answers.type)}`;
      }
    },
  };
}
