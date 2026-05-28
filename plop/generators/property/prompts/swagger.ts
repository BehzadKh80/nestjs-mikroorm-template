import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function swaggerPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'swagger',
    message: 'should be add to swagger:',
    default: true,
    when: (answers) => answers.type !== 'relation',
  };
}
