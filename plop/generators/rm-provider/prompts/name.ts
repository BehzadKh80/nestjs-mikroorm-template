import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listProviders } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'provider name:',
    choices: (answers) => {
      return listProviders(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
