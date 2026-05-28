import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import namePrompt from './name';
import genCrudPrompt from './gen-crud';
import enablePaginationPrompt from './enable-pagination';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [namePrompt(plop), genCrudPrompt(plop), enablePaginationPrompt(plop)];
}
