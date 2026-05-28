import type { ActionType, NodePlopAPI } from 'plop';

export default function removeEnvResource(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeBlock',
    data: {
      path: '.env.example',
      tag: 'resource',
      name: '{{camelCase name}}',
      commentPrefix: '#',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-env-resource - aborted by user';
    },
  };
}
