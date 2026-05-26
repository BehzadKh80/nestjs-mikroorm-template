import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import entityNamePrompt from './entity-name';
import namePrompt from './name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    entityNamePrompt(plop),
    namePrompt(plop),
    confirmPrompt(plop),
  ];
}
