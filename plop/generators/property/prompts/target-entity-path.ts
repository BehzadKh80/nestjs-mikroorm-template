import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { globSync, readFileSync } from 'fs';

export default function targetEntityPathPrompt(
  plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'list',
    name: 'targetEntityPath',
    message: 'target entity import path:',
    choices: (answers): string[] => {
      const pascal = plop.renderString('{{pascalCase targetEntity}}', {
        targetEntity: answers.targetEntity,
      });
      const kebab = plop.renderString('{{kebabCase targetEntity}}', {
        targetEntity: answers.targetEntity,
      });
      const pattern = `src/modules/**/domains/*${kebab}*.ts`;
      let items = globSync(pattern);
      const tempItems = [...items];
      for (const item of tempItems) {
        const src = readFileSync(item).toString();
        if (!src.includes(`export class ${pascal}`)) {
          items = items.filter((v) => v !== item);
        }
      }
      if (items.length === 0) {
        items.push('manual');
      }
      return items;
    },
    when: (answers) => answers.type === 'relation',
  };
}
