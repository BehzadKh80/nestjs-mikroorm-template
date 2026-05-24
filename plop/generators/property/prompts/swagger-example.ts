import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { randomInt } from 'crypto';
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

import { DATE_TYPES, NUMBER_TYPES, STRING_TYPES } from '../constants';

export default function swaggerExamplePrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'input',
    name: 'swaggerExample',
    message: 'swagger example:',
    default: (answers: Record<string, any>) => {
      if (STRING_TYPES.includes(answers.type)) {
        if (answers.format !== 'skip') {
          if (answers.format === 'Email') {
            return 'example@example.com';
          } else if (answers.format === 'StrongPassword') {
            return 'Example@1234';
          } else if (answers.format === 'IP') {
            if (answers.formatOption === '4') {
              return '127.0.0.1';
            } else {
              return '::1';
            }
          }
        }
        let mn: number = answers.minLength ? answers.minLength : 0;
        let mx: number = answers.maxLength ? answers.maxLength : 10;
        if (answers.type === 'character') {
          mn = answers.maxLength ? answers.maxLength : 10;
        }
        const chars = [];
        const CHARS =
          'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = mn; i <= mx; i++) {
          chars.push(CHARS[randomInt(0, CHARS.length)]);
        }
        return chars.join('');
      } else if (NUMBER_TYPES.includes(answers.type)) {
        const mn = answers.minNumber ? answers.minNumber : 0;
        const mx = answers.maxNumber ? answers.maxNumber : 100;
        return randomInt(mn, mx + 1);
      } else if (answers.type === 'uuid') {
        const uv = answers.uuidVersion ? answers.uuidVersion : '4';
        if (uv === '1') {
          return v1();
        } else if (uv === '3') {
          return v3('example.com', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
        } else if (uv === '4') {
          return v4();
        } else if (uv === '5') {
          return v5('example.com', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
        } else if (uv === '6') {
          return v6();
        } else if (uv === '7') {
          return v7();
        } else {
          return v4();
        }
      } else if (answers.type === 'boolean') {
        return true;
      } else if (DATE_TYPES.includes(answers.type)) {
        return new Date().toISOString();
      } else if (answers.type === 'json') {
        return {};
      } else if (answers.type === 'enum') {
        return 'generate auto';
      } else {
        return undefined;
      }
    },
  };
}
