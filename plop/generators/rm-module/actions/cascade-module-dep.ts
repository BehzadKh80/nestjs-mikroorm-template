import type { ActionType, NodePlopAPI } from 'plop';

export default function cascadeModuleDepAction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'cascadeModuleDep',
    data: {
      className: '{{pascalCase name}}Module',
      excludeFiles: ['src/modules/app/app.module.ts'],
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'cascade-module-dep - aborted by user';
    },
  };
}
