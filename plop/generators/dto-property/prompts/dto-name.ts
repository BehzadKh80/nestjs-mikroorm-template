import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listDtos } from '../../../utils/functions';

export default function dtoNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'dtoName',
    message: 'dto name:',
    choices: (answers) => {
      return listDtos(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
