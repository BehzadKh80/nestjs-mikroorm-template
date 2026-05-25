import type { ActionType, NodePlopAPI } from 'plop';

import { CONTROLLER_SPEC_PATH, TEMPLATE_DIR } from '../constants';

export default function appendFixtureEntityProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'modify',
    path: CONTROLLER_SPEC_PATH,
    pattern: /^(?=\s*\/\/ \<\/fixture\>)/m,
    templateFile: `${TEMPLATE_DIR}/fixture-entity-property.hbs`,
  };
}
