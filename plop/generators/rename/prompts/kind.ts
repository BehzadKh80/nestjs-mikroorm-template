import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function kindPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'kind',
    message: 'rename:',
    choices: ['module', 'controller', 'service', 'provider'],
  };
}
