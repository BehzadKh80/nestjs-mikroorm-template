import type { ActionType, NodePlopAPI } from 'plop';

export default function removeDomainProperty(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/domains/{{kebabCase entityName}}.ts',
      tag: 'property',
      name: '{{camelCase name}}',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-domain-property - aborted by user';
    },
  };
}
