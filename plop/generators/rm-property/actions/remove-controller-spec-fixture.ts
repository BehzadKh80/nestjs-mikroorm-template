import type { ActionType, NodePlopAPI } from 'plop';

export default function removeControllerSpecFixture(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase entityName}}.controller.spec.ts',
      tag: 'fixture-property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) {
        return 'remove-controller-spec-fixture - aborted by user';
      }
    },
  };
}
