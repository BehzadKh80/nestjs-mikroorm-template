import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmServiceGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-provider', {
    description: 'Remove a provider from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
