import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function skipDbPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'skipDb',
    message: 'skip db define schema:',
    default: true,
    when: (answers) => answers.type !== 'relation',
  };
}
