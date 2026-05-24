import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function moduleGenerator(plop: NodePlopAPI) {
  plop.setGenerator('module', {
    description: 'Generate a module declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
