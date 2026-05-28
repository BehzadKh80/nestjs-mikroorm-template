export const TEMPLATE_DIR = 'plop/generators/dependency/templates';

export const TARGET_FILE =
  'src/modules/{{kebabCase moduleName}}/' +
  "{{#if (eq target 'controller')}}controllers/{{kebabCase targetName}}.controller{{/if}}" +
  "{{#if (eq target 'service')}}services/{{kebabCase targetName}}.service{{/if}}" +
  "{{#if (eq target 'provider')}}providers/{{kebabCase targetName}}{{/if}}" +
  "{{#if (eq target 'guard')}}guards/{{kebabCase targetName}}.guard{{/if}}" +
  "{{#if (eq target 'middleware')}}middlewares/{{kebabCase targetName}}.middleware{{/if}}" +
  "{{#if (eq target 'pipe')}}pipes/{{kebabCase targetName}}.pipe{{/if}}" +
  '.ts';

export const MODULE_FILE =
  'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts';

export const DEP_IMPORT_PATH =
  "{{#if (eq depKind 'service')}}src/modules/{{kebabCase depModuleName}}/services/{{kebabCase depName}}.service.ts{{/if}}" +
  "{{#if (eq depKind 'provider')}}src/modules/{{kebabCase depModuleName}}/providers/{{kebabCase depName}}.ts{{/if}}" +
  "{{#if (eq depKind 'module')}}src/modules/{{kebabCase depModuleName}}/{{kebabCase depModuleName}}.module.ts{{/if}}";

export const DEP_CLASS =
  "{{#if (eq depKind 'service')}}{{pascalCase depName}}Service{{/if}}" +
  "{{#if (eq depKind 'provider')}}{{pascalCase depName}}{{/if}}" +
  "{{#if (eq depKind 'module')}}{{pascalCase depModuleName}}Module{{/if}}";
