import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listControllers } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'controller name:',
    choices: (answers) => {
      return listControllers(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
