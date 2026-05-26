import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmGuardGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-guard', {
    description: 'Remove a guard from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
