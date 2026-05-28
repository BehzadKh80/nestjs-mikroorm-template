import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function functionGenerator(plop: NodePlopAPI) {
  plop.setGenerator('function', {
    description: 'Add a method to a service or provider',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
