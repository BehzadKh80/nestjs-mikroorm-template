import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
  listControllers,
  listModules,
  listProviders,
  listServices,
} from '../../../utils/functions';

export default function targetNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'rename which:',
    choices: (answers) => {
      if (answers.kind === 'module') return listModules();
      const moduleName = plop.renderString(
        '{{kebabCase moduleName}}',
        answers,
      );
      if (answers.kind === 'controller') return listControllers(moduleName);
      if (answers.kind === 'service') return listServices(moduleName);
      if (answers.kind === 'provider') return listProviders(moduleName);
      return [];
    },
  };
}
