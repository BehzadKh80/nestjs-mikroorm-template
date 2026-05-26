import type { ActionType, NodePlopAPI } from 'plop';

export default function removeModuleController(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
      tag: 'controller',
      name: '{{pascalCase name}}Controller',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-module-controller - aborted by user';
    },
  };
}
