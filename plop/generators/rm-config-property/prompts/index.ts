import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import resourceNamePrompt from './resource-name';
import namePrompt from './name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [resourceNamePrompt(plop), namePrompt(plop), confirmPrompt(plop)];
}
