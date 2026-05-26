import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listEntities } from '../../../utils/functions';

export default function entityNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'entityName',
    message: 'entity name:',
    choices: (answers) => {
      return listEntities(
        plop.renderString('{{kebabCase moduleName}}', answers),
      );
    },
  };
}
