import type { NodePlopAPI } from 'plop';

import actions from './actions';
import prompts from './prompts';

export default function dtoGenerator(plop: NodePlopAPI) {
  plop.setGenerator('dto', {
    description: 'Generate a DTO class',
    prompts: prompts(plop),
    actions: actions(plop),
  });
}
