import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listModules } from '../../../utils/functions';

export default function depModuleNamePrompt(
  plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'list',
    name: 'depModuleName',
    message: 'dependency module:',
    choices: (answers) => {
      const moduleName = plop.renderString(
        '{{kebabCase moduleName}}',
        answers,
      );
      const all = listModules();
      if (answers.target === 'module') {
        return all.filter((m) => m !== moduleName);
      }
      return all;
    },
  };
}
