import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listModules } from '../../../utils/functions';

export default function moduleNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'moduleName',
    message: 'in module:',
    choices: listModules(),
  };
}
