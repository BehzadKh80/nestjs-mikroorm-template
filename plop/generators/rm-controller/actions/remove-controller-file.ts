import type { ActionType, NodePlopAPI } from 'plop';

export default function removeControllerFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase name}}.controller.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-controller-file - aborted by user';
    },
  };
}
