import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function genCrudPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'genCRUD',
    message: 'generate crud?',
    default: true,
  };
}
