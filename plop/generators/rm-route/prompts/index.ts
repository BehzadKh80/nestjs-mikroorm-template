import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import controllerNamePrompt from './controller-name';
import namePrompt from './name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    controllerNamePrompt(plop),
    namePrompt(plop),
    confirmPrompt(plop),
  ];
}
