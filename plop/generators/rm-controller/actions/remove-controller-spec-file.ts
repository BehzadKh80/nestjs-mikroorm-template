import type { ActionType, NodePlopAPI } from 'plop';

export default function removeControllerSpecFile(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase name}}.controller.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm)
        return 'remove-controller-spec-file - aborted by user';
    },
  };
}
