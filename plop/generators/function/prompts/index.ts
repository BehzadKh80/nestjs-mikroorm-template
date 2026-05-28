import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import targetPrompt from './target';
import targetNamePrompt from './target-name';
import namePrompt from './name';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    targetPrompt(plop),
    targetNamePrompt(plop),
    namePrompt(plop),
  ];
}
