import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function enumPathPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'enumPath',
    message:
      'enum import path (e.g. src/common/enums/log-level.enum.ts or a package name):',
    when: (answers: Record<string, any>) => answers.type === 'enum',
  };
}
