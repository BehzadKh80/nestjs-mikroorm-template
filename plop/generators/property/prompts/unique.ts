import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function uniquePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'unique',
    message: 'should be unique:',
    default: false,
    when: (answers) => {
      if (answers.type === 'relation') return false;
      if (answers.skipDb) {
        return false;
      }
      return true;
    },
  };
}
