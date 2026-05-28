import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { FunctionTarget, listFunctions } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'function name:',
    choices: (answers) => {
      const module = plop.renderString('{{kebabCase moduleName}}', answers);
      const target = answers.target as FunctionTarget;
      const targetName = plop.renderString(
        '{{kebabCase targetName}}',
        answers,
      );
      return listFunctions(module, target, targetName);
    },
  };
}
