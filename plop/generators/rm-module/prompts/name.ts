import type { NodePlopAPI } from 'plop';
import { readdirSync, existsSync } from 'fs';

import { PromptQuestion } from '../../types/prompt-question';

const MODULES_DIR = 'src/modules';

function listModules(): string[] {
  if (!existsSync(MODULES_DIR)) return [];
  return readdirSync(MODULES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'app')
    .map((entry) => entry.name)
    .sort();
}

export default function namePrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'name',
    message: `module to remove (one of: ${listModules().join(', ')}):`,
    validate: (input: string) => {
      if (!input) return 'module name is required';
      const choices = listModules();
      if (!choices.includes(input)) {
        return `'${input}' is not in src/modules/. Available: ${choices.join(', ')}`;
      }
      return true;
    },
  };
}
