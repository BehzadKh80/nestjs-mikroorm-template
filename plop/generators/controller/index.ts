import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function controllerGenerator(plop: NodePlopAPI) {
  plop.setGenerator('controller', {
    description: 'Generate a controller declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
