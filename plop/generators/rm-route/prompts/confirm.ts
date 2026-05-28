import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      return plop.renderString(
        'Permanently remove route {{name}} from {{controllerName}} controller in module {{moduleName}}?\nUnused imports referenced only by this route will be cleaned up.\nProceed?',
        answers,
      );
    },
    default: false,
  };
}
