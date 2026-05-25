import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import namePrompt from './name';
import moduleNamePrompt from './module-name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [moduleNamePrompt(plop), namePrompt(plop), confirmPrompt(plop)];
}
