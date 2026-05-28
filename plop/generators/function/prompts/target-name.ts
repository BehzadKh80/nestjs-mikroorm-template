import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
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
    message: (answers) => `${answers.target} name:`,
    choices: (answers) => {
      const module = plop.renderString('{{kebabCase moduleName}}', answers);
      switch (answers.target) {
        case 'service':
          return listServices(module);
        case 'provider':
          return listProviders(module);
        case 'guard':
          return listGuards(module);
        case 'middleware':
          return listMiddlewares(module);
        case 'pipe':
          return listPipes(module);
        default:
          return [];
      }
    },
  };
}
