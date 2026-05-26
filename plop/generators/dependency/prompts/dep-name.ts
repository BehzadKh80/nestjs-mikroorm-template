import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
  listProviders,
  listServices,
} from '../../../utils/functions';

export default function depNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'depName',
    message: 'dependency name:',
    when: (answers) => {
      if (answers.depKind === 'module') {
        answers.depName = answers.depModuleName;
        return false;
      }
      return true;
    },
    choices: (answers) => {
      const depModuleName = plop.renderString(
        '{{kebabCase depModuleName}}',
        answers,
      );
      if (answers.depKind === 'service') return listServices(depModuleName);
      if (answers.depKind === 'provider') return listProviders(depModuleName);
      return [];
    },
  };
}
