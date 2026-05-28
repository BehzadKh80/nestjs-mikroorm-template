import type { NodePlopAPI } from 'plop';

import { PromptQuestion } from '../../types/prompt-question';
import { scanConfigProviderReferences } from '../../../utils/cascade';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      const providerSymbol = plop.renderString(
        '{{constantCase name}}_CONFIG_PROVIDER',
        answers,
      );
      const selfFile = plop.renderString(
        'src/modules/config/resources/{{kebabCase name}}-resource.ts',
        answers,
      );
      const optionsFile = 'src/modules/config/config-module-options.ts';
      const affected = scanConfigProviderReferences(providerSymbol, [
        selfFile,
        optionsFile,
      ]);
      const list = affected.length
        ? '\n  ' + affected.join('\n  ') + '\n(these files will NOT be auto-cleaned)'
        : '\n  (no other files reference it)';
      return plop.renderString(
        `Permanently remove {{name}} config resource?\nReferenced by:${list}\nProceed?`,
        answers,
      );
    },
    default: false,
  };
}
