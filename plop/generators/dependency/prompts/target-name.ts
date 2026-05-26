import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
  listControllers,
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
      if (answers.target === 'controller') return listControllers(moduleName);
      if (answers.target === 'service') return listServices(moduleName);
      if (answers.target === 'provider') return listProviders(moduleName);
      return [];
    },
  };
}
