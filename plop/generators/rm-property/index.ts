import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmPropertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-property', {
    description: 'Remove a property from resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
