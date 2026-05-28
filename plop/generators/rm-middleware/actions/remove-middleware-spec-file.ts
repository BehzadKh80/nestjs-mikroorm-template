import type { ActionType, NodePlopAPI } from 'plop';

export default function removeMiddlewareSpecFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/middlewares/{{kebabCase name}}.middleware.spec.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-middleware-spec-file - aborted by user';
    },
  };
}
