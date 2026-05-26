import type { ActionType, NodePlopAPI } from 'plop';

export default function removePImport(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeImport',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/entities/{{kebabCase entityName}}.entity.ts',
      importName: 'p',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'remove-p-import - aborted by user';
    },
  };
}
