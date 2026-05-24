import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function moduleNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'moduleName',
    message: 'module name:',
  };
}
