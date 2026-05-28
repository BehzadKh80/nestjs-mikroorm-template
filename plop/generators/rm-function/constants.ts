export const TARGET_PATH =
  'src/modules/{{kebabCase moduleName}}/' +
  "{{#if (eq target 'service')}}services/{{kebabCase targetName}}.service{{/if}}" +
  "{{#if (eq target 'provider')}}providers/{{kebabCase targetName}}{{/if}}" +
  "{{#if (eq target 'guard')}}guards/{{kebabCase targetName}}.guard{{/if}}" +
  "{{#if (eq target 'middleware')}}middlewares/{{kebabCase targetName}}.middleware{{/if}}" +
  "{{#if (eq target 'pipe')}}pipes/{{kebabCase targetName}}.pipe{{/if}}" +
  '.ts';
