import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function dependencyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('dependency', {
    description: 'Inject a dependency into a module, controller, service, or provider',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
