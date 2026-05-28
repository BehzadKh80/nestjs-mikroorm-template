import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listDtoProperties } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'property name:',
    choices: (answers) => {
      return listDtoProperties(
        plop.renderString('{{kebabCase moduleName}}', answers),
        plop.renderString('{{kebabCase dtoName}}', answers),
      );
    },
  };
}
