import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function targetPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'target',
    message: 'remove function from:',
    choices: ['service', 'provider', 'guard', 'middleware', 'pipe'],
    default: 'service',
  };
}
