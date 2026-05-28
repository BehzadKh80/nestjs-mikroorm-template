import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function mappedByPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'mappedBy',
    message: 'mappedBy (inverse field on target):',
    when: (answers) => {
      if (answers.type !== 'relation') return false;
      if (answers.relationKind === 'oneToMany') return true;
      if (
        (answers.relationKind === 'oneToOne' ||
          answers.relationKind === 'manyToMany') &&
        answers.relationOwner === false
      ) {
        return true;
      }
      return false;
    },
  };
}
