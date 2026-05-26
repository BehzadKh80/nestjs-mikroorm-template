import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import {
  listControllers,
  listModules,
  listProviders,
  listServices,
} from '../../../utils/functions';

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

export default function newNamePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'newName',
    message: 'new name (kebab-case):',
    validate: (input: string, answers?: Record<string, any>) => {
      if (!input) return 'name is required';
      if (!KEBAB.test(input)) {
        return 'name must be kebab-case (lowercase letters, digits, hyphens)';
      }
      if (input === answers?.name) return 'new name equals old name';
      const a = answers ?? {};
      const moduleName = plop.renderString('{{kebabCase moduleName}}', a);
      let existing: string[] = [];
      if (a.kind === 'module') existing = listModules();
      else if (a.kind === 'controller') existing = listControllers(moduleName);
      else if (a.kind === 'service') existing = listServices(moduleName);
      else if (a.kind === 'provider') existing = listProviders(moduleName);
      if (existing.includes(input)) {
        return `a ${a.kind} named '${input}' already exists`;
      }
      return true;
    },
  };
}
