import type { ActionType, NodePlopAPI } from 'plop';

export default function removeResourceFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/config/resources/{{kebabCase name}}-resource.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-resource-file - aborted by user';
    },
  };
}
