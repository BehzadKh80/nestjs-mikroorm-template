import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import resourceNamePrompt from './resource-name';
import namePrompt from './name';
import typePrompt from './type';
import defaultValuePrompt from './default-value';
import urlProtocolsPrompt from './url-protocols';
import enumNamePrompt from './enum-name';
import enumPathPrompt from './enum-path';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    resourceNamePrompt(plop),
    namePrompt(plop),
    typePrompt(plop),
    defaultValuePrompt(plop),
    urlProtocolsPrompt(plop),
    enumNamePrompt(plop),
    enumPathPrompt(plop),
  ];
}
