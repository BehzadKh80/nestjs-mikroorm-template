import type { ActionType, NodePlopAPI } from 'plop';

export default function removeCreateDtoProperty(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/dto/create-{{kebabCase entityName}}.dto.ts',
      tag: 'property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) {
        return 'remove-create-dto-property - aborted by user';
      }
    },
  };
}
