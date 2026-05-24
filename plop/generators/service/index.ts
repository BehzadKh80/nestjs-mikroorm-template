import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function serviceGenerator(plop: NodePlopAPI) {
  plop.setGenerator('service', {
    description: 'Generate a service declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
