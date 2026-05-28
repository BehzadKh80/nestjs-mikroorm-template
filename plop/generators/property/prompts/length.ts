import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function lengthPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'length',
    message: 'property length:',
    when: (answers) => {
      if (answers.type === 'relation') return false;
      if (answers.skipDb) {
        return false;
      }
      const allowedType = ['string', 'character', 'datetime'];
      if (allowedType.includes(answers['type'])) {
        return true;
      } else {
        return false;
      }
    },
  };
}
