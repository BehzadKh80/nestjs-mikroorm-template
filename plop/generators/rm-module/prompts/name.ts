import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';
import { listModules } from '../../../utils/functions';

export default function namePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: `module to remove:`,
    choices: listModules(),
  };
}
