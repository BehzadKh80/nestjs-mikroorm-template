import type { ActionType, NodePlopAPI } from 'plop';

import { SERVICE_SPEC_PATH, TEMPLATE_DIR } from '../constants';

export default function appendFixtureDtoProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'modify',
    path: SERVICE_SPEC_PATH,
    pattern: /^(?=\s*\/\/ \<\/fixture\>)/m,
    templateFile: `${TEMPLATE_DIR}/fixture-dto-property.hbs`,
    skip: (answers: Record<string, any>) => {
      if (!answers.addCreate) {
        return 'fixture-dto-property - property is not in create dto';
      }
    },
  };
}
