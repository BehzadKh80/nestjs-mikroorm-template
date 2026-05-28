import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmDtoGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-dto', {
    description: 'Remove a DTO from the module',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
