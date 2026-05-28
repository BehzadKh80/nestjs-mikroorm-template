import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmFunctionGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-function', {
    description: 'Remove a function from a service, provider, guard, middleware, or pipe',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
