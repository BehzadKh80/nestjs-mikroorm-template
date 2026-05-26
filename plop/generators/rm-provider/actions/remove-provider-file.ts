import type { ActionType, NodePlopAPI } from 'plop';

export default function removeProviderFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-provider-file - aborted by user';
    },
  };
}
