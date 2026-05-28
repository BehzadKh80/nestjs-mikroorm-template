import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function relationKindPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'relationKind',
    message: 'relation kind:',
    choices: ['manyToOne', 'oneToMany', 'oneToOne', 'manyToMany'],
    when: (answers) => answers.type === 'relation',
  };
}
