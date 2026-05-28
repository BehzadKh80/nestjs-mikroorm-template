import type { ActionType, NodePlopAPI } from 'plop';

export default function removeOptionsImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/config/config-module-options.ts',
      tag: 'import',
      name: '{{pascalCase name}}Config',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-options-import - aborted by user';
    },
  };
}
