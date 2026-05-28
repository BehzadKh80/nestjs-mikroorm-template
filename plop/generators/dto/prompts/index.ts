import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import namePrompt from './name';
import usedInPrompt from './used-in';
import controllerNamePrompt from './controller-name';
import routeNamePrompt from './route-name';
import argTypePrompt from './arg-type';
import serviceNamePrompt from './service-name';
import providerNamePrompt from './provider-name';
import functionNamePrompt from './function-name';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    namePrompt(plop),
    usedInPrompt(plop),
    controllerNamePrompt(plop),
    routeNamePrompt(plop),
    argTypePrompt(plop),
    serviceNamePrompt(plop),
    providerNamePrompt(plop),
    functionNamePrompt(plop),
  ];
}
