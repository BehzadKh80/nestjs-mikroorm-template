import type { ActionType, NodePlopAPI } from 'plop';

export default function removeModuleProvider(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
      tag: 'provider',
      name: '{{pascalCase name}}Middleware',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-module-provider - aborted by user';
    },
  };
}
