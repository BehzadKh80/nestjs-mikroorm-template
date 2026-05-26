import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listGuards } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'guard name:',
    choices: (answers) => {
      return listGuards(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
