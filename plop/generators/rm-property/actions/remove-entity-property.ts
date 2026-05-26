import type { ActionType, NodePlopAPI } from 'plop';

export default function removeEntityProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/entities/{{kebabCase entityName}}.entity.ts',
      tag: 'property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-entity-property - aborted by user';
    },
  };
}
