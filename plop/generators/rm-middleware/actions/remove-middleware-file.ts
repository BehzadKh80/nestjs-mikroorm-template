import type { ActionType, NodePlopAPI } from 'plop';

export default function removeMiddlewareFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/middlewares/{{kebabCase name}}.middleware.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-middleware-file - aborted by user';
    },
  };
}
