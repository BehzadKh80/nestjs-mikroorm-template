import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listFunctions } from '../../../utils/functions';

export default function functionNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'functionName',
    message: 'function name:',
    choices: (answers) => {
      const module = plop.renderString('{{kebabCase moduleName}}', answers);
      if (answers.usedIn === 'service') {
        const svc = plop.renderString('{{kebabCase serviceName}}', answers);
        return listFunctions(module, 'service', svc);
      }
      if (answers.usedIn === 'provider') {
        const prv = plop.renderString('{{kebabCase providerName}}', answers);
        return listFunctions(module, 'provider', prv);
      }
      return [];
    },
    when: (answers) =>
      answers.usedIn === 'service' || answers.usedIn === 'provider',
  };
}
