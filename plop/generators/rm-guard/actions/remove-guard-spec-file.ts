import type { ActionType, NodePlopAPI } from 'plop';

export default function removeGuardSpecFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-guard-spec-file - aborted by user';
    },
  };
}
