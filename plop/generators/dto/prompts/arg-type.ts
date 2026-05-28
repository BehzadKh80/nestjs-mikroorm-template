import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function argTypePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'argType',
    message: 'argument decorator:',
    choices: ['Param', 'Body', 'Query'],
    default: 'Body',
    when: (answers) => answers.usedIn === 'controller',
  };
}
