import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function renameGenerator(plop: NodePlopAPI) {
  plop.setGenerator('rename', {
    description: 'Rename a module, controller, service, or provider',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
