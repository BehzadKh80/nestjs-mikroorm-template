import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import targetPrompt from './target';
import moduleNamePrompt from './module-name';
import targetNamePrompt from './target-name';
import depKindPrompt from './dep-kind';
import depModuleNamePrompt from './dep-module-name';
import depNamePrompt from './dep-name';
import propertyNamePrompt from './property-name';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    targetPrompt(plop),
    moduleNamePrompt(plop),
    targetNamePrompt(plop),
    depKindPrompt(plop),
    depModuleNamePrompt(plop),
    depNamePrompt(plop),
    propertyNamePrompt(plop),
  ];
}
