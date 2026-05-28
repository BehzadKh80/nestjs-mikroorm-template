import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listServices } from '../../../utils/functions';

export default function serviceNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'serviceName',
    message: 'service name:',
    choices: (answers) => {
      return listServices(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
    when: (answers) => answers.usedIn === 'service',
  };
}
