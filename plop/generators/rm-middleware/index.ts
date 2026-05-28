import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmMiddlewareGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-middleware', {
    description: 'Remove a middleware from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
