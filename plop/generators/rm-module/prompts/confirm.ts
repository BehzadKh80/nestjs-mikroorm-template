import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';
import { scanModuleDepCascade } from '../../../utils/cascade';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      const className = plop.renderString('{{pascalCase name}}Module', answers);
      const selfDir = plop.renderString(
        'src/modules/{{kebabCase name}}',
        answers,
      );
      const appModule = 'src/modules/app/app.module.ts';
      const affected = scanModuleDepCascade(className, [appModule]).filter(
        (f) => !f.startsWith(selfDir),
      );
      const list = affected.length
        ? '\n  ' + affected.join('\n  ')
        : '\n  (no other modules depend on it)';
      return plop.renderString(
        `Permanently remove src/modules/{{name}}/ and its registration in app.module.ts?\nWill also strip <import>/<dependency> blocks from:${list}\nProceed?`,
        answers,
      );
    },
    default: false,
  };
}
