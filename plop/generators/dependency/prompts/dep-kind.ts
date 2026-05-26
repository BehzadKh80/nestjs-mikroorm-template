import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function depKindPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'depKind',
    message: 'dependency kind:',
    when: (answers) => {
      if (answers.target === 'module') {
        answers.depKind = 'module';
        return false;
      }
      return true;
    },
    choices: ['service', 'provider'],
  };
}
