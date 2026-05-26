import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import { STRING_TYPES } from '../constants';

export default function maxLengthPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'maxLength',
    message: 'maximum length:',
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (STRING_TYPES.includes(answers.type)) {
        return true;
      }
      return false;
    },
    default: -1,
  };
}
