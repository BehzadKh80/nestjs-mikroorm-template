import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmServiceGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-service', {
    description: 'Remove a service from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
