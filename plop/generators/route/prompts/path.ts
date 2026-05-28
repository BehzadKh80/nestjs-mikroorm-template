import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function pathPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'path',
    message: 'route path (leave empty for none):',
    default: '',
  };
}
