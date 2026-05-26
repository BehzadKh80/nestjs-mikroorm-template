import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function propertyNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'propertyName',
    message: 'property name:',
    when: (answers) => answers.target !== 'module',
    default: (answers: Record<string, any>) => {
      if (answers.depKind === 'service') {
        return plop.renderString('{{camelCase depName}}Service', answers);
      }
      if (answers.depKind === 'provider') {
        return plop.renderString('{{camelCase depName}}', answers);
      }
      return '';
    },
  };
}
