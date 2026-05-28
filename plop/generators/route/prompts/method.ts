import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { HTTP_METHODS } from '../constants';

export default function methodPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'method',
    message: 'http method:',
    choices: HTTP_METHODS,
    default: 'Get',
  };
}
