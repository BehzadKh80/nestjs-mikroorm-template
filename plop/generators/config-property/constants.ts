export const TEMPLATE_DIR = 'plop/generators/config-property/templates';

export const RESOURCE_PATH =
  'src/modules/config/resources/{{kebabCase resourceName}}-resource.ts';

export const ENV_PATH = '.env.example';

export const CLASS_VALIDATOR_PKG = 'class-validator';
export const CLASS_TRANSFORMER_PKG = 'class-transformer';
export const HELPERS_PATH = 'src/common/helper/functions.ts';

export const PROPERTY_TYPES = [
  'string',
  'number',
  'boolean',
  'url',
  'enum',
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
