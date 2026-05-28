import type { ActionType, NodePlopAPI } from 'plop';

export default function cascadeInjectionAction(_plop: NodePlopAPI): ActionType {
  return {
    type: 'cascadeInjection',
    data: {
      className: '{{pascalCase name}}Pipe',
      excludeFiles: [
        'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.ts',
        'src/modules/{{kebabCase moduleName}}/pipes/{{kebabCase name}}.pipe.spec.ts',
        'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
      ],
    },
    skip: (answers: Record<string, any>) => {
      if (!answers.confirm) return 'cascade-injection - aborted by user';
    },
  };
}
