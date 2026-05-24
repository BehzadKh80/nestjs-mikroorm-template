import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function entityNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'entityName',
    message: 'entity name:',
  };
}
