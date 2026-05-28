import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listPipes } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'pipe name:',
    choices: (answers) => {
      return listPipes(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
