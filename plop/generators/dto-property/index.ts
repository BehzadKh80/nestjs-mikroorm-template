import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function dtoPropertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('dto-property', {
    description: 'Add a property to a DTO',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
