import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function relationOwnerPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'relationOwner',
    message: 'is this the owning side:',
    default: true,
    when: (answers) =>
      answers.type === 'relation' &&
      (answers.relationKind === 'oneToOne' ||
        answers.relationKind === 'manyToMany'),
  };
}
