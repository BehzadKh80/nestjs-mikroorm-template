import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function typePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'type',
    message: 'property type:',
    choices: [
      'string',
      'integer',
      'boolean',
      'enum',
      'datetime',
      'character',
      'json',
      'text',
      'date',
      'time',
      'float',
      'uuid',
      'smallint',
      'bigint',
    ],
  };
}
