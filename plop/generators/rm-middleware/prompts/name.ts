import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listMiddlewares } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'middleware name:',
    choices: (answers) => {
      return listMiddlewares(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
