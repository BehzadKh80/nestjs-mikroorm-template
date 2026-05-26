import type { ActionType, NodePlopAPI } from 'plop';

export default function removeAppDependency(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/app/app.module.ts',
      tag: 'dependency',
      name: '{{pascalCase name}}Module',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-app-dependency - aborted by user';
    },
  };
}
