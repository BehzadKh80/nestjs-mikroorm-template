import type { ActionType, NodePlopAPI } from 'plop';

export default function cascadeInjectionAction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'cascadeInjection',
    data: {
      className: '{{pascalCase name}}Guard',
      excludeFiles: [
        'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.ts',
        'src/modules/{{kebabCase moduleName}}/guards/{{kebabCase name}}.guard.spec.ts',
        'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
      ],
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'cascade-injection - aborted by user';
    },
  };
}
