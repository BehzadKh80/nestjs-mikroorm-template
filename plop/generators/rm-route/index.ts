import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmRouteGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-route', {
    description: 'Remove a route from a controller',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
