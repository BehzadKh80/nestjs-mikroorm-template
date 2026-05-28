import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listDtos } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'dto name:',
    choices: (answers) => {
      return listDtos(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
