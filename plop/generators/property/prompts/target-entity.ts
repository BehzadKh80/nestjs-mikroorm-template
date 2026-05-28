import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function targetEntityPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'targetEntity',
    message: 'target entity class name:',
    when: (answers) => answers.type === 'relation',
  };
}
