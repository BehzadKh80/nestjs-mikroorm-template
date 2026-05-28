import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function routeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('route', {
    description: 'Add a route handler to a controller',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
