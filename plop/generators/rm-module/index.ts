import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmModuleGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-module', {
    description: 'Remove a module from the project',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
