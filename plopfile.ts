import type { NodePlopAPI } from 'plop';

export default async function (plop: NodePlopAPI) {
  plop.setGenerator('module', {
    description: 'Generate a module declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'module name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: 'plop-templates/module/module.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/app/app.module.ts',
        pattern: /\<import \/\>/,
        unique: true,
        templateFile: 'plop-templates/module/app-import.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/app/app.module.ts',
        pattern: /\<module \/\>/,
        unique: true,
        templateFile: 'plop-templates/module/app-module.hbs',
      },
    ],
  });
}
