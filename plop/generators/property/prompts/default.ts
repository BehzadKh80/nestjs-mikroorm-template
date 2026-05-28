import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function defaultPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'default',
    message: 'default value:',
    when: (answers) => {
      if (answers.type === 'relation') return false;
      if (answers.skipDb) {
        return false;
      }
      return true;
    },
  };
}
