import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function forceAddValidatorPrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'confirm',
    name: 'addValidator',
    message: 'add validator (forced):',
    default: true,
    when: (answers) => {
      answers.addValidator = true;
      return false;
    },
  };
}
