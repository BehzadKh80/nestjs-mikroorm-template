import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { PROPERTY_TYPES } from '../constants';

export default function typePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'type',
    message: 'property type:',
    choices: [...PROPERTY_TYPES],
  };
}
