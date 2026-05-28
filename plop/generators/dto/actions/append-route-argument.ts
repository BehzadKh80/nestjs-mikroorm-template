import type { ActionType, NodePlopAPI } from 'plop';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { CONTROLLER_PATH, TEMPLATE_DIR } from '../constants';

export default function appendRouteArgument(_plop: NodePlopAPI): ActionType {
  return {
    type: 'appendRouteArgument',
    data: {
      path: CONTROLLER_PATH,
      routeName: '{{camelCase routeName}}',
      argName: '{{camelCase name}}Dto',
      template: readFileSync(
        resolve(`${TEMPLATE_DIR}/route-argument.hbs`),
        'utf8',
      ),
    },
    skip: (answers: Record<string, any>) => {
      if (answers.usedIn !== 'controller') {
        return 'append-route-argument - dto is not used in a controller';
      }
    },
  };
}
