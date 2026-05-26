import type { ActionType, NodePlopAPI } from 'plop';

export default function removeProviderSpecFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm)
        return 'remove-provider-spec-file - aborted by user';
    },
  };
}
