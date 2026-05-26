import type { ActionType, NodePlopAPI } from 'plop';

export default function removeServiceSpecFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase name}}.service.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-service-spec-file - aborted by user';
    },
  };
}
