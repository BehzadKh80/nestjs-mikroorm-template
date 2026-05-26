import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import kindPrompt from './kind';
import moduleNamePrompt from './module-name';
import targetNamePrompt from './target-name';
import newNamePrompt from './new-name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    kindPrompt(plop),
    moduleNamePrompt(plop),
    targetNamePrompt(plop),
    newNamePrompt(plop),
    confirmPrompt(plop),
  ];
}
