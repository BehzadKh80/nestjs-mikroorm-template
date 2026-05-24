import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function propertyGenerator(plop: NodePlopAPI) {
  plop.setGenerator('property', {
    description: 'Add a property to resource',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
