import type { ActionType, NodePlopAPI } from 'plop';

export default function removeServiceSpecFixture(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase entityName}}.service.spec.ts',
      tag: 'fixture-property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) {
        return 'remove-service-spec-fixture - aborted by user';
      }
    },
  };
}
