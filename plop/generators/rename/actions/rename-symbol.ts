import type { ActionType, NodePlopAPI } from 'plop';

export default function renameSymbolAction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'renameSymbol',
    data: {
      kind: '{{kind}}',
      moduleName: '{{kebabCase moduleName}}',
      oldName: '{{kebabCase name}}',
      newName: '{{kebabCase newName}}',
      renameProperty: true,
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'rename - aborted by user';
    },
  };
}
