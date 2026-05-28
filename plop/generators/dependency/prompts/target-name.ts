import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
  listControllers,
  listGuards,
  listMiddlewares,
  listPipes,
  listProviders,
  listServices,
} from '../../../utils/functions';

export default function targetNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'targetName',
    message: 'target name:',
    when: (answers) => answers.target !== 'module',
    choices: (answers) => {
      const moduleName = plop.renderString(
        '{{kebabCase moduleName}}',
        answers,
      );
      switch (answers.target) {
        case 'controller':
          return listControllers(moduleName);
        case 'service':
          return listServices(moduleName);
        case 'provider':
          return listProviders(moduleName);
        case 'guard':
          return listGuards(moduleName);
        case 'middleware':
          return listMiddlewares(moduleName);
        case 'pipe':
          return listPipes(moduleName);
        default:
          return [];
      }
    },
  };
}
