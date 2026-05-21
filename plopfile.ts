import type { NodePlopAPI } from 'plop';

function moduleGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/module';
  plop.setGenerator('module', {
    description: 'Generate a module declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'module name',
      },
      // {
      //   type: 'checkbox',
      //   name: 'dependencies',
      //   message: 'module dependencies',
      //   choices: []
      // }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: `${templateDir}/module.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/app/app.module.ts',
        pattern: /\<import \/\>/,
        unique: true,
        templateFile: `${templateDir}/app-import.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/app/app.module.ts',
        pattern: /\<module \/\>/,
        unique: true,
        templateFile: `${templateDir}/app-module.hbs`,
      },
    ],
  });
}

function controllerGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/controller';
  plop.setGenerator('controller', {
    description: 'Generate a controller declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase name}}.controller.ts',
        templateFile: `${templateDir}/controller.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase name}}.controller.spec.ts',
        templateFile: `${templateDir}/controller.spec.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<import \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-import.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<controller \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-controller.hbs`,
      },
    ],
  });
}

function serviceGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/service';
  plop.setGenerator('service', {
    description: 'Generate a service declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'service name',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase name}}.service.ts',
        templateFile: `${templateDir}/service.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/services/{{kebabCase name}}.service.spec.ts',
        templateFile: `${templateDir}/service.spec.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<import \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-import.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<provider \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-service.hbs`,
      },
    ],
  });
}
function providerGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/provider';
  plop.setGenerator('provider', {
    description: 'Generate a provider declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'provider name',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.ts',
        templateFile: `${templateDir}/provider.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/providers/{{kebabCase name}}.spec.ts',
        templateFile: `${templateDir}/provider.spec.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<import \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-import.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts',
        pattern: /\<provider \/\>/,
        unique: true,
        templateFile: `${templateDir}/module-provider.hbs`,
      },
    ],
  });
}

export default async function (plop: NodePlopAPI) {
  moduleGenerator(plop);
  controllerGenerator(plop);
  serviceGenerator(plop);
  providerGenerator(plop);
}
