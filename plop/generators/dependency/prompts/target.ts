import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function targetPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'target',
    message: 'inject into:',
    choices: [
      'module',
      'controller',
      'service',
      'provider',
      'guard',
      'middleware',
      'pipe',
    ],
  };
}
