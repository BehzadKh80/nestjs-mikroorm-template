import type { ActionType, NodePlopAPI } from 'plop';

export default function removeModuleDir(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-module-dir - aborted by user';
    },
  };
}
