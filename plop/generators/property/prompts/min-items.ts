import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function minItemsPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'minItems',
    message: 'minimum items:',
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
