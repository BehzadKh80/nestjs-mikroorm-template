import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function enumNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'enumName',
    message: 'enum class name (e.g. LogLevel):',
    when: (answers: Record<string, any>) => answers.type === 'enum',
  };
}
