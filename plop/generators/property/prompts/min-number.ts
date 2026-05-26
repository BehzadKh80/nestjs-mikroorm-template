import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import { NUMBER_TYPES } from '../constants';

export default function minNumberPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'number',
    name: 'minNumber',
    message: 'minimum number:',
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
