import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import { NUMBER_TYPES } from '../constants';

export default function maxNumberPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'maxNumber',
    message: 'maximum number:',
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (NUMBER_TYPES.includes(answers.type)) {
        return true;
      }
      return false;
    },
    default: -1,
  };
}
