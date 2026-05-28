import type { ActionType, NodePlopAPI } from 'plop';

export default function removeApiPropertyImport(
  _plop: NodePlopAPI,
): ActionType {
  return {
    type: 'removeImport',
    data: {
      path: 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase dtoName}}.dto.ts',
      importName: 'ApiProperty',
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) {
        return 'remove-api-property-import - aborted by user';
      }
    },
  };
}
