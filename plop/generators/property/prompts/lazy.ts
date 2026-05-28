import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function lazyPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'lazy',
    message: 'should be lazy loading:',
    default: false,
    when: (answers) => {
      if (answers.type === 'relation') return false;
      if (answers.skipDb) {
        return false;
      }
      return true;
    },
  };
}
