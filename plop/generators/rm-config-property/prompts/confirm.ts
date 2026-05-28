import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) =>
      plop.renderString(
        'Permanently remove property {{name}} from {{resourceName}} config resource?',
        answers,
      ),
    default: false,
  };
}
