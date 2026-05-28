import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function usedInPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'usedIn',
    message: 'where will this dto be used:',
    choices: ['controller', 'provider', 'service'],
    default: 'controller',
  };
}
