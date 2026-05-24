export const TEMPLATE_DIR = 'plop/generators/property/templates';

export const ENTITY_PATH =
  'src/modules/{{kebabCase moduleName}}/entities/{{kebabCase entityName}}.entity.ts';

export const DOMAIN_PATH =
  'src/modules/{{kebabCase moduleName}}/domains/{{kebabCase entityName}}.ts';

export const STRING_TYPES = ['string', 'text', 'character'];
export const NUMBER_TYPES = ['integer', 'float', 'smallint', 'bigint'];
export const DATE_TYPES = ['datetime', 'date', 'time'];
export const SELECTABLE_FORMATS = [
  'IdentityCard',
  'PassportNumber',
  'IP',
  'PostalCode',
  'ISBN',
  'MobilePhone',
  'PhoneNumber',
  'Hash',
];
