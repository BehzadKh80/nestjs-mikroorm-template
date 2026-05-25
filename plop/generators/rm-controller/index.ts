import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmModuleGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-controller', {
    description: 'Remove a controller from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
