import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function configGenerator(plop: NodePlopAPI) {
  plop.setGenerator('config', {
    description: 'Generate a config resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
