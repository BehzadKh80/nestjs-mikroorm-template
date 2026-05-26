import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function exportPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'export',
    message: 'should export:',
    default: false,
  };
}
