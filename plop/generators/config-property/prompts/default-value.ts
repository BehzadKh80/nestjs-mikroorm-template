import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function defaultValuePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'defaultValue',
    message: 'default value (empty to skip):',
    when: (answers: Record<string, any>) =>
      answers.type === 'string' ||
      answers.type === 'number' ||
      answers.type === 'boolean',
  };
}
