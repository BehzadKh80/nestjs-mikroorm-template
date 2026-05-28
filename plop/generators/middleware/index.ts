import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function middlewareGenerator(plop: NodePlopAPI) {
  plop.setGenerator('middleware', {
    description: 'Generate a middleware declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
