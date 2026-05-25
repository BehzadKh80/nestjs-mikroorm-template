import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function minLengthPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'minLength',
    message: 'minimum length:',
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (['string', 'text'].includes(answers.type)) {
        return true;
      }
      return false;
    },
    default: -1,
  };
}
