import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function enumNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'enumName',
    message: 'enter enum class name:',
    when: (answers) => {
      if (answers.type === 'enum') {
        return true;
      }
      return false;
    },
  };
}
