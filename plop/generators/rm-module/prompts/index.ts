import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';

import namePrompt from './name';
import confirmPrompt from './confirm';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [namePrompt(plop), confirmPrompt(plop)];
}
