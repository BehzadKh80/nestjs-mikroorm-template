import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function enablePaginationPrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'confirm',
    name: 'enablePagination',
    message: 'enable pagination on list:',
    default: true,
    when: (answers) => answers.genCRUD === true,
  };
}
