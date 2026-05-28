import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listConfigResources } from '../../../utils/functions';

export default function namePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'config resource:',
    choices: listConfigResources(),
  };
}
