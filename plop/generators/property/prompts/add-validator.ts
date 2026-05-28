import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function addValidatorPrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'confirm',
    name: 'addValidator',
    message: 'setup validator:',
    default: true,
    when: (answers) => answers.type !== 'relation',
  };
}
