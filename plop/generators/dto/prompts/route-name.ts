import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listRoutes } from '../../../utils/functions';

export default function routeNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'routeName',
    message: 'route name:',
    choices: (answers) => {
      return listRoutes(
        plop.renderString('{{kebabCase moduleName}}', answers),
        plop.renderString('{{kebabCase controllerName}}', answers),
      );
    },
    when: (answers) => answers.usedIn === 'controller',
  };
}
