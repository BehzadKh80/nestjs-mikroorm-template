import type { ActionType, NodePlopAPI } from 'plop';

export default function removeServiceFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase name}}.service.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-service-file - aborted by user';
    },
  };
}
