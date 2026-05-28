import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';
import { scanInjectionCascade } from '../../../utils/cascade';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      const className = plop.renderString('{{pascalCase name}}Middleware', answers);
      const selfFile = plop.renderString(
        'src/modules/{{kebabCase moduleName}}/middlewares/{{kebabCase name}}.middleware.ts',
        answers,
      );
      const selfSpec = plop.renderString(
        'src/modules/{{kebabCase moduleName}}/middlewares/{{kebabCase name}}.middleware.spec.ts',
        answers,
      );
      const moduleFile = plop.renderString(
        'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        answers,
      );
      const affected = scanInjectionCascade(className, [
        selfFile,
        selfSpec,
        moduleFile,
      ]);
      const list = affected.length
        ? '\n  ' + affected.join('\n  ')
        : '\n  (no other files reference it)';
      return plop.renderString(
        `Permanently remove {{name}} in module {{moduleName}} and its registration?\nWill also strip injection blocks from:${list}\nProceed?`,
        answers,
      );
    },
    default: false,
  };
}
