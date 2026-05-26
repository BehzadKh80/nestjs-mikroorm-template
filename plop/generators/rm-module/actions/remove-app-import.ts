import type { ActionType, NodePlopAPI } from 'plop';

export default function removeAppImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/app/app.module.ts',
      tag: 'import',
      name: '{{pascalCase name}}Module',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-app-import - aborted by user';
    },
  };
}
