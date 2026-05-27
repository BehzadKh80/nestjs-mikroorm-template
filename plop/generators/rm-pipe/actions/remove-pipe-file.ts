import type { ActionType, NodePlopAPI } from 'plop';

export default function removePipeFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-pipe-file - aborted by user';
    },
  };
}
