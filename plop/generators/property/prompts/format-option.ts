import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import { SELECTABLE_FORMATS, STRING_TYPES } from '../constants';
import {
  HASH_OPTIONS,
  IDENTITY_CARD_OPTIONS,
  IP_OPTIONS,
  ISBN_OPTIONS,
  MOBILE_PHONE_OPTIONS,
  PASSPORT_NUMBER_OPTIONS,
  PHONE_NUMBER_OPTIONS,
  POSTAL_CODE_OPTIONS,
} from '../format-option-choices';

export default function formatOptionPrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'list',
    name: 'formatOption',
    message: 'format option:',
    choices: (answers) => {
      if (answers.format === 'IdentityCard') {
        return IDENTITY_CARD_OPTIONS;
      } else if (answers.format === 'PassportNumber') {
        return PASSPORT_NUMBER_OPTIONS;
      } else if (answers.format === 'IP') {
        return IP_OPTIONS;
      } else if (answers.format === 'PostalCode') {
        return POSTAL_CODE_OPTIONS;
      } else if (answers.foramt === 'ISBN') {
        return ISBN_OPTIONS;
      } else if (answers.format === 'MobilePhone') {
        return MOBILE_PHONE_OPTIONS;
      } else if (answers.format === 'PhoneNumber') {
        return PHONE_NUMBER_OPTIONS;
      } else if (answers.format === 'Hash') {
        return HASH_OPTIONS;
      }
      return [];
    },
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (
        STRING_TYPES.includes(answers.type) &&
        SELECTABLE_FORMATS.includes(answers.format)
      ) {
        return true;
      }
      return false;
    },
  };
}
