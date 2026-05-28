import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function arrayPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'array',
    message: 'should be array:',
    default: false,
    when: (answers) => answers.type !== 'relation',
  };
}
