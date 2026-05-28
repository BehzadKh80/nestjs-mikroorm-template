import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';
import { scanInjectionCascade } from '../../../utils/cascade';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      const className = plop.renderString('{{pascalCase name}}Dto', answers);
      const selfFile = plop.renderString(
        'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase name}}.dto.ts',
        answers,
      );
      const affected = scanInjectionCascade(className, [selfFile]);
      const list = affected.length
        ? '\n  ' + affected.join('\n  ')
        : '\n  (no other files reference it)';
      return plop.renderString(
        `Permanently remove {{name}} dto in module {{moduleName}}?\nReferenced by:${list}\nProceed?`,
        answers,
      );
    },
    default: false,
  };
}
