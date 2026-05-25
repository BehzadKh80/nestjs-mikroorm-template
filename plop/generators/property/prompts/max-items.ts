import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function maxItemsPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'maxItems',
    message: 'maximum items:',
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (answers.array) {
        return true;
      }
      return false;
    },
    default: -1,
  };
}
