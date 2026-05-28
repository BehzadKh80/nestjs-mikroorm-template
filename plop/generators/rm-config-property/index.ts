import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmConfigPropertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-config-property', {
    description: 'Remove a property from a config resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
