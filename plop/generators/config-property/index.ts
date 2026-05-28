import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function configPropertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('config-property', {
    description: 'Add a property to a config resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
