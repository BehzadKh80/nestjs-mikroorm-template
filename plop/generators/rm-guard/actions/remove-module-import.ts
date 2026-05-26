import type { ActionType, NodePlopAPI } from 'plop';

export default function removeModuleImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
      tag: 'import',
      name: '{{pascalCase name}}Guard',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-module-import - aborted by user';
    },
  };
}
