import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listServices } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'service name:',
    choices: (answers) => {
      return listServices(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
