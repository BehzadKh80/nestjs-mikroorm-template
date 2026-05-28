import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function inversedByPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'inversedBy',
    message: 'inversedBy (owning field on target, leave empty to skip):',
    when: (answers) => {
      if (answers.type !== 'relation') return false;
      if (answers.relationKind === 'manyToOne') return true;
      if (
        (answers.relationKind === 'oneToOne' ||
          answers.relationKind === 'manyToMany') &&
        answers.relationOwner === true
      ) {
        return true;
      }
      return false;
    },
  };
}
