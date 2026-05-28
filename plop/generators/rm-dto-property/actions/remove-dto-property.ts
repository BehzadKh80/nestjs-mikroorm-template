import type { ActionType, NodePlopAPI } from 'plop';

export default function removeDtoProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase dtoName}}.dto.ts',
      tag: 'property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-dto-property - aborted by user';
    },
  };
}
