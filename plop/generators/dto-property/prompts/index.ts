import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import moduleNamePrompt from './module-name';
import dtoNamePrompt from './dto-name';
import typePrompt from './type';
import forceAddValidatorPrompt from './force-add-validator';

import namePrompt from '../../property/prompts/name';
import enumNamePrompt from '../../property/prompts/enum-name';
import enumPathPrompt from '../../property/prompts/enum-path';
import nullablePrompt from '../../property/prompts/nullable';
import arrayPrompt from '../../property/prompts/array';
import minLengthPrompt from '../../property/prompts/min-length';
import maxLengthPrompt from '../../property/prompts/max-length';
import formatPrompt from '../../property/prompts/format';
import formatOptionPrompt from '../../property/prompts/format-option';
import minNumberPrompt from '../../property/prompts/min-number';
import maxNumberPrompt from '../../property/prompts/max-number';
import minItemsPrompt from '../../property/prompts/min-items';
import maxItemsPrompt from '../../property/prompts/max-items';
import uuidVersionPrompt from '../../property/prompts/uuid-version';
import swaggerPrompt from '../../property/prompts/swagger';
import swaggerExamplePrompt from '../../property/prompts/swagger-example';

export default function prompts(plop: NodePlopAPI): PromptQuestion[] {
  return [
    moduleNamePrompt(plop),
    dtoNamePrompt(plop),
    namePrompt(plop),
    typePrompt(plop),
    enumNamePrompt(plop),
    enumPathPrompt(plop),
    nullablePrompt(plop),
    arrayPrompt(plop),
    forceAddValidatorPrompt(plop),
    minLengthPrompt(plop),
    maxLengthPrompt(plop),
    formatPrompt(plop),
    formatOptionPrompt(plop),
    minNumberPrompt(plop),
    maxNumberPrompt(plop),
    minItemsPrompt(plop),
    maxItemsPrompt(plop),
    uuidVersionPrompt(plop),
    swaggerPrompt(plop),
    swaggerExamplePrompt(plop),
  ];
}
