import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { globSync, readFileSync } from 'fs';

export default function enumPathPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'enumPath',
    message: 'select enum class path:',
    choices: (answers): string[] => {
      const pascalEnumName = plop.renderString('{{pascalCase enumName}}', {
        enumName: answers.enumName,
      });
      const pattern = plop.renderString(
        'src/modules/**/enums/*{{kebabCase enumName}}*.enum.ts',
        {
          enumName: answers.enumName,
        },
      );
      let items = globSync(pattern);
      const tempItems = [...items];
      for (const item of tempItems) {
        const enumSrc = readFileSync(item).toString();
        if (!enumSrc.includes(`export enum ${pascalEnumName}`)) {
          items = items.filter((value) => value !== item);
        }
      }
      items.push('new enum');
      return items;
    },
    when: (answers) => {
      if (answers.type !== 'enum') {
        return false;
      }
      return true;
    },
  };
}
