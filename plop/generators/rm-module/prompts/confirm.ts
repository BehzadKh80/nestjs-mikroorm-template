import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';

export default function confirmPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers: Record<string, any>) =>
      `Permanently remove src/modules/${answers.name}/ and its registration in app.module.ts?`,
    default: false,
  };
}
