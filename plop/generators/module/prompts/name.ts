import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function namePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'name',
    message: 'module name:',
  };
}
