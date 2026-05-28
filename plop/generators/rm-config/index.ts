import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmConfigGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-config', {
    description: 'Remove a config resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
