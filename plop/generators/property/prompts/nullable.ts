import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function nullablePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'nullable',
    message: 'should be nullable:',
    default: false,
  };
}
