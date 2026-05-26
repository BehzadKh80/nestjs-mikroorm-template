import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listProperties } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'property name:',
    choices: (answers) => {
      return listProperties(
        plop.renderString('{{kebabCase moduleName}}', answers),
        plop.renderString('{{kebabCase entityName}}', answers),
      );
    },
  };
}
