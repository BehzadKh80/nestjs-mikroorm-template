import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function resourceGenerator(plop: NodePlopAPI) {
  plop.setGenerator('resource', {
    description: 'Generate a resource declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
