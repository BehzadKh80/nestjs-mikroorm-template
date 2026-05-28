import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmPipeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-pipe', {
    description: 'Remove a pipe from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
