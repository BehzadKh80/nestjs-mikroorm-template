import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listConfigResources } from '../../../utils/functions';

export default function resourceNamePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'resourceName',
    message: 'config resource:',
    choices: listConfigResources(),
  };
}
