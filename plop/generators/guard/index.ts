import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function guardGenerator(plop: NodePlopAPI) {
  plop.setGenerator('guard', {
    description: 'Generate a guard declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
