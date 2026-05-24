import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function providerGenerator(plop: NodePlopAPI) {
  plop.setGenerator('provider', {
    description: 'Generate a provider declaration',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
