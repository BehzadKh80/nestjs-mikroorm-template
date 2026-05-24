import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import entityNamePrompt from './entity-name';
import namePrompt from './name';
import typePrompt from './type';
import enumNamePrompt from './enum-name';
import enumPathPrompt from './enum-path';
import nullablePrompt from './nullable';
import arrayPrompt from './array';
import skipDbPrompt from './skip-db';
import lengthPrompt from './length';
import addValidatorPrompt from './add-validator';
import minLengthPrompt from './min-length';
import maxLengthPrompt from './max-length';
import formatPrompt from './format';
import formatOptionPrompt from './format-option';
import minNumberPrompt from './min-number';
import maxNumberPrompt from './max-number';
import minItemsPrompt from './min-items';
import maxItemsPrompt from './max-items';
import uuidVersionPrompt from './uuid-version';
import hiddenPrompt from './hidden';
import lazyPrompt from './lazy';
import uniquePrompt from './unique';
import defaultPrompt from './default';
import swaggerPrompt from './swagger';
import swaggerExamplePrompt from './swagger-example';
import addCreatePrompt from './add-create';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    entityNamePrompt(plop),
    namePrompt(plop),
    typePrompt(plop),
    enumNamePrompt(plop),
    enumPathPrompt(plop),
    nullablePrompt(plop),
    arrayPrompt(plop),
    skipDbPrompt(plop),
    lengthPrompt(plop),
    addValidatorPrompt(plop),
    minLengthPrompt(plop),
    maxLengthPrompt(plop),
    formatPrompt(plop),
    formatOptionPrompt(plop),
    minNumberPrompt(plop),
    maxNumberPrompt(plop),
    minItemsPrompt(plop),
    maxItemsPrompt(plop),
    uuidVersionPrompt(plop),
    hiddenPrompt(plop),
    lazyPrompt(plop),
    uniquePrompt(plop),
    defaultPrompt(plop),
    swaggerPrompt(plop),
    swaggerExamplePrompt(plop),
    addCreatePrompt(plop),
  ];
}
