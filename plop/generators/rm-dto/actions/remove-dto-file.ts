import type { ActionType, NodePlopAPI } from 'plop';

export default function removeDtoFile(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removePath',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase name}}.dto.ts',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-dto-file - aborted by user';
    },
  };
}
