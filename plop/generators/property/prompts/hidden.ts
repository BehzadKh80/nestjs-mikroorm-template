import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function hiddenPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'hidden',
    message: 'should be hidden from response:',
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
