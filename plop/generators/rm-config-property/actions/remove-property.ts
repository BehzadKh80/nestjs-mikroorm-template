import type { ActionType, NodePlopAPI } from 'plop';

export default function removeProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/config/resources/{{kebabCase resourceName}}-resource.ts',
      tag: 'property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-property - aborted by user';
    },
  };
}
