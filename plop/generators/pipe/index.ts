import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function pipeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('pipe', {
    description: 'Generate a pipe declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
