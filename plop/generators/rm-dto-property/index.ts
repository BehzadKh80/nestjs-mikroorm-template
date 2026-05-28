import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function rmDtoPropertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rm-dto-property', {
    description: 'Remove a property from a DTO',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
