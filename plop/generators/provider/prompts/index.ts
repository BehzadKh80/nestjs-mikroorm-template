import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import namePrompt from './name';
import moduleNamePrompt from './module-name';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [namePrompt(plop), moduleNamePrompt(plop)];
}
