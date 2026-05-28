import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      return plop.renderString(
        'Permanently remove property {{name}} from {{dtoName}} dto in module {{moduleName}}?',
        answers,
      );
    },
    default: false,
  };
}
