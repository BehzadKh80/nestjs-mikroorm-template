import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function uuidVersionPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'uuidVersion',
    message: 'uuid version:',
    choices: ['any', '1', '3', '4', '5', '6', '7'],
    default: 3,
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (['uuid'].includes(answers.type)) {
        return true;
      }
      return false;
    },
  };
}
