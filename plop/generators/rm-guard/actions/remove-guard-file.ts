import type { ActionType, NodePlopAPI } from 'plop';

export default function removeGuardFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-guard-file - aborted by user';
    },
  };
}
