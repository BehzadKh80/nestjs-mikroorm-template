import type { ActionType, NodePlopAPI } from 'plop';

export default function removeOptionsImportLine(_plop: NodePlopAPI): ActionType {
  return {
    type: 'removeImport',
    data: {
      path: 'src/modules/config/config-module-options.ts',
      importName: '{{constantCase name}}_CONFIG_PROVIDER',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) {
        return 'remove-options-import-line - aborted by user';
      }
    },
  };
}
