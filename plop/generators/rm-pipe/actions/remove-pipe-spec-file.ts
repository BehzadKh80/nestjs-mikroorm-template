import type { ActionType, NodePlopAPI } from 'plop';

export default function removePipeSpecFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-pipe-spec-file - aborted by user';
    },
  };
}
