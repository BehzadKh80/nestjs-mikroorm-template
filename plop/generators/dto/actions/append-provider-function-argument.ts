import type { ActionType, NodePlopAPI } from 'plop';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { PROVIDER_PATH, TEMPLATE_DIR } from '../constants';

export default function appendProviderFunctionArgument(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'appendFunctionArgument',
    data: {
      path: PROVIDER_PATH,
      functionName: '{{camelCase functionName}}',
      argName: '{{camelCase name}}Dto',
      template: readFileSync(
        resolve(`${TEMPLATE_DIR}/function-argument.hbs`),
        'utf8',
      ),
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'provider') {
        return 'append-provider-function-argument - dto is not used in a provider';
      }
    },
  };
}
