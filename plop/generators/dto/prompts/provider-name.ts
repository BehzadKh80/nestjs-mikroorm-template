import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listProviders } from '../../../utils/functions';

export default function providerNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'providerName',
    message: 'provider name:',
    choices: (answers) => {
      return listProviders(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
    when: (answers) => answers.usedIn === 'provider',
  };
}
