import type { NodePlopAPI } from 'plop';
import { existsSync, globSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { randomInt } from 'crypto';
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

// --- Utils ---
function toRelativePath(fromFile: string, toFile: string): string {
  const fromDir = dirname(fromFile);
  const relativePath = relative(fromDir, toFile);
  return relativePath.startsWith('.') ? relativePath : './' + relativePath;
}

// --- Helpers ---
function isDbStringType(plop: NodePlopAPI) {
  plop.setHelper('isDbStringType', function (type: string) {
    return ['string', 'enum', 'text', 'character'].includes(type);
  });
}

function isDbLength(plop: NodePlopAPI) {
  plop.setHelper('isDbLength', function (type: string) {
    return ['string', 'datetime', 'character'].includes(type);
  });
}

function isDateType(plop: NodePlopAPI) {
  plop.setHelper('isDateType', function (type: string) {
    return ['datetime', 'date', 'time'].includes(type);
  });
}

function dbType2Ts(plop: NodePlopAPI) {
  plop.setHelper('dbType2Ts', function (type: string) {
    const numberTypes = ['integer', 'float', 'smallint', 'bigint'];
    const dateTypes = ['datetime', 'date', 'time'];
    // const objectTypes = ['json'];
    // const relationTypes = ['relation'];
    const stringTypes = ['string', 'uuid', 'enum', 'character', 'text'];
    if (stringTypes.includes(type)) {
      return 'string';
    } else if (numberTypes.includes(type)) {
      return 'number';
    } else if (dateTypes.includes(type)) {
      return 'Date';
    } else if (type === 'json') {
      return 'Record<string, any>';
    } else if (type === 'enum') {
    } else if (type === 'boolean') {
      return 'boolean';
    } else {
      return 'any';
    }
  });
}

function isStringType(plop: NodePlopAPI) {
  plop.setHelper('isStringType', function (type: string) {
    return ['string', 'text', 'character'].includes(type);
  });
}

function isNumberType(plop: NodePlopAPI) {
  plop.setHelper('isNumberType', function (type: string) {
    return ['integer', 'float', 'smallint', 'bigint'].includes(type);
  });
}

function isIntegerType(plop: NodePlopAPI) {
  plop.setHelper('isIntegerType', function (type: string) {
    return ['integer', 'smallint', 'bigint'].includes(type);
  });
}

function format2Swagger(plop: NodePlopAPI) {
  plop.setHelper(
    'format2Swagger',
    function (
      format: string,
      formatOption: string | undefined,
    ): string | undefined {
      if (format === 'Email') {
        return 'email';
      } else if (format === 'StrongPassword') {
        return 'password';
      } else if (format === 'IP') {
        if (formatOption === '4') {
          return 'ipv4';
        } else {
          return 'ipv6';
        }
      } else if (format === 'FQDN') {
        return 'idn-hostname';
      } else if (format === 'Url') {
        return 'uri';
      }
      return undefined;
    },
  );
}

function isSelectableFormat(plop: NodePlopAPI) {
  plop.setHelper('isSelectableFormat', function (format: string) {
    return [
      'IdentityCard',
      'PassportNumber',
      'IP',
      'PostalCode',
      'ISBN',
      'MobilePhone',
      'PhoneNumber',
      'Hash',
    ].includes(format);
  });
}

function logicalEqual(plop: NodePlopAPI) {
  plop.setHelper('eq', function (a: any, b: any) {
    return a === b;
  });
}

function logicalNotEqual(plop: NodePlopAPI) {
  plop.setHelper('neq', function (a: any, b: any) {
    return a !== b;
  });
}

function logicalAnd(plop: NodePlopAPI) {
  plop.setHelper('and', function (a: boolean, b: boolean) {
    return a && b;
  });
}

function logicalGreaterThan(plop: NodePlopAPI) {
  plop.setHelper('gt', function (a: any, b: any) {
    return a > b;
  });
}

function logicalGreaterThanOrEqual(plop: NodePlopAPI) {
  plop.setHelper('gte', function (a: any, b: any) {
    return a >= b;
  });
}

function logicalOr(plop: NodePlopAPI) {
  plop.setHelper('or', function (a: boolean, b: boolean) {
    return a || b;
  });
}
// function inArray(plop: NodePlopAPI) {
//   plop.setHelper('in', function (item: any, items: any[]) {
//     return items.includes(item);
//   });
// }

const helpers: ((plop: NodePlopAPI) => void)[] = [
  isNumberType,
  isSelectableFormat,
  format2Swagger,
  isDbStringType,
  isDbLength,
  dbType2Ts,
  logicalEqual,
  logicalNotEqual,
  logicalAnd,
  logicalOr,
  logicalGreaterThan,
  logicalGreaterThanOrEqual,
  isIntegerType,
  isStringType,
  isDateType,
];

// --- Actions ---
function addImportAction(plop: NodePlopAPI) {
  plop.setActionType('addImport', (answers, config, plop) => {
    const data: any = config?.data;

    const relativePath = plop.renderString(data.path, answers);
    const filePath = resolve(relativePath);
    const importName = plop.renderString(
      typeof data.importName === 'string'
        ? data.importName
        : data.importName(answers),
      answers,
    );
    const fromRendered: string = plop.renderString(
      typeof data.from === 'string' ? data.from : data.from(answers),
      answers,
    );
    let fromPkg = fromRendered.startsWith('src')
      ? toRelativePath(relativePath, fromRendered)
      : fromRendered;
    if (fromPkg.endsWith('.ts'))
      fromPkg = fromPkg.slice(0, fromPkg.lastIndexOf('.'));
    if (!fromPkg) throw new Error('addImport: `from` is required');
    if (!importName) throw new Error('addImport: `importName` is required');
    if (!existsSync(filePath))
      throw new Error(`addImport: file not found — ${filePath}`);

    // Escape the package name for use in a regex
    const escapedPkg = fromPkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const importRegex = new RegExp(
      `^import\\s*\\{([^}]*)\\}\\s*from\\s*['"]${escapedPkg}['"]`,
      'm',
    );

    let content = readFileSync(filePath, 'utf8');
    const match = content.match(importRegex);

    if (match) {
      const existing = match[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (existing.includes(importName)) {
        return `${importName} already imported from '${fromPkg}' — skipped`;
      }

      existing.push(importName);
      existing.sort();

      content = content.replace(
        importRegex,
        `import { ${existing.join(', ')} } from '${fromPkg}'`,
      );
    } else {
      // Prepend a new import line at the top of the file
      content = `import { ${importName} } from '${fromPkg}';\n` + content;
    }

    writeFileSync(filePath, content, 'utf8');
    return `Added '${importName}' to import from '${fromPkg}' in ${relativePath}`;
  });
}

// --- Generator ---
function moduleGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/module';
  plop.setGenerator('module', {
    description: 'Generate a module declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'module name:',
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
        message: 'controller name:',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
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
        message: 'service name:',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
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
        message: 'provider name:',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
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

function resourceGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/resource';
  plop.setGenerator('resource', {
    description: 'Generate a resource declaration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'resource name:',
      },
      {
        type: 'confirm',
        name: 'genCRUD',
        message: 'generate crud?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: `${templateDir}/module.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/services/{{kebabCase name}}.service.ts',
        templateFile: `${templateDir}/service.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/services/{{kebabCase name}}.service.spec.ts',
        templateFile: `${templateDir}/service.spec.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/controllers/{{kebabCase name}}.controller.ts',
        templateFile: `${templateDir}/controller.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/controllers/{{kebabCase name}}.controller.spec.ts',
        templateFile: `${templateDir}/controller.spec.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
        templateFile: `${templateDir}/create-dto.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate create-dto.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/dto/update-{{kebabCase name}}.dto.ts',
        templateFile: `${templateDir}/update-dto.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate update-dto.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/entities/{{kebabCase name}}.entity.ts',
        templateFile: `${templateDir}/entity.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/domains/{{kebabCase name}}.ts',
        templateFile: `${templateDir}/domain.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/repositories/{{kebabCase name}}.repository.ts',
        templateFile: `${templateDir}/repository.hbs`,
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/responses/create-{{kebabCase name}}.response.ts',
        templateFile: `${templateDir}/create.response.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate create.resonse.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/responses/list-{{kebabCase name}}.response.ts',
        templateFile: `${templateDir}/list.response.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate list.resonse.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/responses/detail-{{kebabCase name}}.response.ts',
        templateFile: `${templateDir}/detail.response.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate detail.resonse.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/responses/update-{{kebabCase name}}.response.ts',
        templateFile: `${templateDir}/update.response.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate update.resonse.hbs';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/responses/delete-{{kebabCase name}}.response.ts',
        templateFile: `${templateDir}/delete.response.hbs`,
        skip: (answers: Record<string, any>) => {
          if (!answers.genCRUD) {
            return 'skip generate delete.resonse.hbs';
          }
        },
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

function propertyGenerator(plop: NodePlopAPI) {
  const templateDir = 'plop-templates/property';
  const entityPath =
    'src/modules/{{kebabCase moduleName}}/entities/{{kebabCase entityName}}.entity.ts';
  const domainPath =
    'src/modules/{{kebabCase moduleName}}/domains/{{kebabCase entityName}}.ts';
  plop.setGenerator('property', {
    description: 'Add a property to resource',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
      },
      {
        type: 'input',
        name: 'entityName',
        message: 'entity name:',
      },
      {
        type: 'input',
        name: 'name',
        message: 'property name:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'property type:',
        choices: [
          'string',
          'integer',
          'boolean',
          'enum',
          'relation',
          'datetime',
          'character',
          'json',
          'text',
          'date',
          'time',
          'float',
          'uuid',
          'smallint',
          'bigint',
        ],
      },
      {
        type: 'input',
        name: 'enumName',
        message: 'enter enum class name:',
        when: (answers) => {
          if (answers.type === 'enum') {
            return true;
          }
          return false;
        },
      },
      {
        type: 'list',
        name: 'enumPath',
        message: 'select enum class path:',
        choices: (answers): string[] => {
          const pascalEnumName = plop.renderString('{{pascalCase enumName}}', {
            enumName: answers.enumName,
          });
          const pattern = plop.renderString(
            'src/modules/**/enums/*{{kebabCase enumName}}*.enum.ts',
            {
              enumName: answers.enumName,
            },
          );
          let items = globSync(pattern);
          const tempItems = [...items];
          for (const item of tempItems) {
            const enumSrc = readFileSync(item).toString();
            if (!enumSrc.includes(`export enum ${pascalEnumName}`)) {
              items = items.filter((value) => value !== item);
            }
          }
          items.push('new enum');
          return items;
        },
        when: (answers) => {
          if (answers.type !== 'enum') {
            return false;
          }
          return true;
          // const pattern = plop.renderString(
          //   'src/modules/**/enums/*{{kebabCase enumName}}*.enum.ts',
          //   {
          //     enumName: answers.enumName,
          //   },
          // );
          // return globSync(pattern).length > 0 ? true : false;
        },
      },
      {
        type: 'confirm',
        name: 'nullable',
        message: 'should be nullable:',
        default: false,
      },
      {
        type: 'confirm',
        name: 'array',
        message: 'should be array:',
        default: false,
      },
      {
        type: 'confirm',
        name: 'skipDb',
        message: 'skip db define schema:',
        default: true,
      },
      {
        type: 'number',
        name: 'length',
        message: 'property length:',
        when: (answers) => {
          if (answers.skipDb) {
            return false;
          }
          const allowedType = ['string', 'character', 'datetime'];
          if (allowedType.includes(answers['type'])) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'addValidator',
        message: 'setup validator:',
        default: true,
      },
      // --- String Validator ---
      {
        type: 'number',
        name: 'minLength',
        message: 'minimum length:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (['string', 'text'].includes(answers.type)) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      {
        type: 'number',
        name: 'maxLength',
        message: 'maximum length:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (['string', 'character', 'text'].includes(answers.type)) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      {
        type: 'list',
        name: 'format',
        message: 'string format:',
        choices: [
          'skip',
          'Alpha',
          'Alphanumeric',
          'Decimal',
          'Ascii',
          'Base32',
          'Base58',
          'Base64',
          'IBAN',
          'BIC',
          'CreditCard',
          'Currency',
          'ISO4217CurrencyCode',
          'EthereumAddress',
          'BtcAddress',
          'DataURI',
          'Email',
          'FQDN',
          'FullWidth',
          'HalfWidth',
          'VariableWidth',
          'HexColor',
          'HSL',
          'RgbColor',
          'IdentityCard',
          'PassportNumber',
          'PostalCode',
          'Hexadecimal',
          'Octal',
          'MACAddress',
          'IP',
          'Port',
          'ISBN',
          'EAN',
          'ISIN',
          'ISO8601',
          'JSON',
          'JWT',
          'Lowercase',
          'LatLong',
          'Latitude',
          'Longitude',
          'MobilePhone',
          'ISO6391',
          'ISO31661Alpha2',
          'ISO31661Alpha3',
          'ISO31661Numeric',
          'Locale',
          'PhoneNumber',
          'MongoId',
          'Multibyte',
          'NumberString',
          'SurrogatePair',
          'TaxId',
          'Url',
          'MagnetURI',
          'FirebasePushId',
          'Uppercase',
          'MilitaryTime',
          'TimeZone',
          'Hash',
          'MimeType',
          'SemVer',
          'ISSN',
          'ISRC',
          'RFC3339',
          'StrongPassword',
        ],
        default: 0,
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (['string', 'character', 'text'].includes(answers.type)) {
            return true;
          }
          return false;
        },
      },
      {
        type: 'list',
        name: 'formatOption',
        message: 'format option:',
        choices: (answers) => {
          if (answers.format === 'IdentityCard') {
            return [
              'ar-LY',
              'ar-TN',
              'ES',
              'FI',
              'he-IL',
              'IN',
              'IR',
              'IT',
              'LK',
              'NO',
              'PK',
              'PL',
              'TH',
              'zh-CN',
              'zh-HK',
              'zh-TW',
            ];
          } else if (answers.format === 'PassportNumber') {
            return [
              'AM',
              'AR',
              'AT',
              'AU',
              'AZ',
              'BE',
              'BG',
              'BR',
              'BY',
              'CA',
              'CH',
              'CN',
              'CY',
              'CZ',
              'DE',
              'DK',
              'DZ',
              'EE',
              'ES',
              'FI',
              'FR',
              'GB',
              'GR',
              'HR',
              'HU',
              'IE',
              'IN',
              'ID',
              'IR',
              'IS',
              'IT',
              'JM',
              'JP',
              'KR',
              'KZ',
              'LI',
              'LT',
              'LU',
              'LV',
              'LY',
              'MT',
              'MZ',
              'MY',
              'MX',
              'NL',
              'NZ',
              'PH',
              'PK',
              'PL',
              'PT',
              'RO',
              'RU',
              'SE',
              'SL',
              'SK',
              'TH',
              'TR',
              'UA',
              'US',
              'ZA',
            ];
          } else if (answers.format === 'IP') {
            return ['4', '6'];
          } else if (answers.format === 'PostalCode') {
            return [
              'AD',
              'AT',
              'AU',
              'AZ',
              'BA',
              'BD',
              'BE',
              'BG',
              'BR',
              'BY',
              'CA',
              'CH',
              'CN',
              'CO',
              'CZ',
              'DE',
              'DK',
              'DO',
              'DZ',
              'EE',
              'ES',
              'FI',
              'FR',
              'GB',
              'GR',
              'HR',
              'HT',
              'HU',
              'ID',
              'IE',
              'IL',
              'IN',
              'IR',
              'IS',
              'IT',
              'JP',
              'KE',
              'KR',
              'LI',
              'LT',
              'LU',
              'LV',
              'LK',
              'MG',
              'MX',
              'MT',
              'MY',
              'NL',
              'NO',
              'NP',
              'NZ',
              'PK',
              'PL',
              'PR',
              'PT',
              'RO',
              'RU',
              'SA',
              'SE',
              'SG',
              'SI',
              'SK',
              'TH',
              'TN',
              'TW',
              'UA',
              'US',
              'ZA',
              'ZM',
            ];
          } else if (answers.foramt === 'ISBN') {
            return ['10', '13'];
          } else if (answers.format === 'MobilePhone') {
            return [
              'am-AM',
              'ar-AE',
              'ar-BH',
              'ar-DZ',
              'ar-LB',
              'ar-EG',
              'ar-IQ',
              'ar-JO',
              'ar-KW',
              'ar-LY',
              'ar-MA',
              'ar-OM',
              'ar-PS',
              'ar-SA',
              'ar-SD',
              'ar-SY',
              'ar-TN',
              'az-AZ',
              'ar-QA',
              'bs-BA',
              'be-BY',
              'bg-BG',
              'bn-BD',
              'ca-AD',
              'cs-CZ',
              'da-DK',
              'de-DE',
              'de-AT',
              'de-CH',
              'de-LU',
              'dv-MV',
              'el-GR',
              'el-CY',
              'en-AI',
              'en-AU',
              'en-AG',
              'en-BM',
              'en-BS',
              'en-GB',
              'en-GG',
              'en-GH',
              'en-GY',
              'en-HK',
              'en-MO',
              'en-IE',
              'en-IN',
              'en-JM',
              'en-KE',
              'fr-CF',
              'en-SS',
              'en-KI',
              'en-KN',
              'en-LS',
              'en-MT',
              'en-MU',
              'en-MW',
              'en-NA',
              'en-NG',
              'en-NZ',
              'en-PG',
              'en-PK',
              'en-PH',
              'en-RW',
              'en-SG',
              'en-SL',
              'en-TZ',
              'en-UG',
              'en-US',
              'en-ZA',
              'en-ZM',
              'en-ZW',
              'en-BW',
              'es-AR',
              'es-BO',
              'es-CO',
              'es-CL',
              'es-CR',
              'es-CU',
              'es-DO',
              'es-HN',
              'es-EC',
              'es-ES',
              'es-GT',
              'es-PE',
              'es-MX',
              'es-NI',
              'es-PA',
              'es-PY',
              'es-SV',
              'es-UY',
              'es-VE',
              'et-EE',
              'fa-IR',
              'fi-FI',
              'fj-FJ',
              'fo-FO',
              'fr-BF',
              'fr-BJ',
              'fr-CD',
              'fr-CM',
              'fr-FR',
              'fr-GF',
              'fr-GP',
              'fr-MQ',
              'fr-PF',
              'fr-RE',
              'fr-WF',
              'he-IL',
              'hu-HU',
              'id-ID',
              'ir-IR',
              'it-IT',
              'it-SM',
              'ja-JP',
              'ka-GE',
              'kk-KZ',
              'kl-GL',
              'ko-KR',
              'ky-KG',
              'lt-LT',
              'lv-LV',
              'mg-MG',
              'mn-MN',
              'my-MM',
              'ms-MY',
              'mz-MZ',
              'nb-NO',
              'ne-NP',
              'nl-BE',
              'nl-NL',
              'nl-AW',
              'nn-NO',
              'pl-PL',
              'pt-BR',
              'pt-PT',
              'pt-AO',
              'ro-MD',
              'ro-RO',
              'ru-RU',
              'si-LK',
              'sl-SI',
              'sk-SK',
              'so-SO',
              'sq-AL',
              'sr-RS',
              'sv-SE',
              'tg-TJ',
              'th-TH',
              'tr-TR',
              'tk-TM',
              'uk-UA',
              'uz-UZ',
              'vi-VN',
              'zh-CN',
              'zh-TW',
              'dz-BT',
              'ar-YE',
              'ar-EH',
              'fa-AF',
              'mk-MK',
            ];
          } else if (answers.format === 'PhoneNumber') {
            return [
              'AC',
              'AD',
              'AE',
              'AF',
              'AG',
              'AI',
              'AL',
              'AM',
              'AO',
              'AR',
              'AS',
              'AT',
              'AU',
              'AW',
              'AX',
              'AZ',
              'BA',
              'BB',
              'BD',
              'BE',
              'BF',
              'BG',
              'BH',
              'BI',
              'BJ',
              'BL',
              'BM',
              'BN',
              'BO',
              'BQ',
              'BR',
              'BS',
              'BT',
              'BW',
              'BY',
              'BZ',
              'CA',
              'CC',
              'CD',
              'CF',
              'CG',
              'CH',
              'CI',
              'CK',
              'CL',
              'CM',
              'CN',
              'CO',
              'CR',
              'CU',
              'CV',
              'CW',
              'CX',
              'CY',
              'CZ',
              'DE',
              'DJ',
              'DK',
              'DM',
              'DO',
              'DZ',
              'EC',
              'EE',
              'EG',
              'EH',
              'ER',
              'ES',
              'ET',
              'FI',
              'FJ',
              'FK',
              'FM',
              'FO',
              'FR',
              'GA',
              'GB',
              'GD',
              'GE',
              'GF',
              'GG',
              'GH',
              'GI',
              'GL',
              'GM',
              'GN',
              'GP',
              'GQ',
              'GR',
              'GT',
              'GU',
              'GW',
              'GY',
              'HK',
              'HN',
              'HR',
              'HT',
              'HU',
              'ID',
              'IE',
              'IL',
              'IM',
              'IN',
              'IO',
              'IQ',
              'IR',
              'IS',
              'IT',
              'JE',
              'JM',
              'JO',
              'JP',
              'KE',
              'KG',
              'KH',
              'KI',
              'KM',
              'KN',
              'KP',
              'KR',
              'KW',
              'KY',
              'KZ',
              'LA',
              'LB',
              'LC',
              'LI',
              'LK',
              'LR',
              'LS',
              'LT',
              'LU',
              'LV',
              'LY',
              'MA',
              'MC',
              'MD',
              'ME',
              'MF',
              'MG',
              'MH',
              'MK',
              'ML',
              'MM',
              'MN',
              'MO',
              'MP',
              'MQ',
              'MR',
              'MS',
              'MT',
              'MU',
              'MV',
              'MW',
              'MX',
              'MY',
              'MZ',
              'NA',
              'NC',
              'NE',
              'NF',
              'NG',
              'NI',
              'NL',
              'NO',
              'NP',
              'NR',
              'NU',
              'NZ',
              'OM',
              'PA',
              'PE',
              'PF',
              'PG',
              'PH',
              'PK',
              'PL',
              'PM',
              'PR',
              'PS',
              'PT',
              'PW',
              'PY',
              'QA',
              'RE',
              'RO',
              'RS',
              'RU',
              'RW',
              'SA',
              'SB',
              'SC',
              'SD',
              'SE',
              'SG',
              'SH',
              'SI',
              'SJ',
              'SK',
              'SL',
              'SM',
              'SN',
              'SO',
              'SR',
              'SS',
              'ST',
              'SV',
              'SX',
              'SY',
              'SZ',
              'TA',
              'TC',
              'TD',
              'TG',
              'TH',
              'TJ',
              'TK',
              'TL',
              'TM',
              'TN',
              'TO',
              'TR',
              'TT',
              'TV',
              'TW',
              'TZ',
              'UA',
              'UG',
              'US',
              'UY',
              'UZ',
              'VA',
              'VC',
              'VE',
              'VG',
              'VI',
              'VN',
              'VU',
              'WF',
              'WS',
              'XK',
              'YE',
              'YT',
              'ZA',
              'ZM',
              'ZW',
            ];
          } else if (answers.format === 'Hash') {
            return [
              'md4',
              'md5',
              'sha1',
              'sha256',
              'sha384',
              'sha512',
              'ripemd128',
              'ripemd160',
              'tiger128',
              'tiger160',
              'tiger192',
              'crc32',
              'crc32b',
            ];
          }
          return [];
        },
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (
            ['string', 'character', 'text'].includes(answers.type) &&
            [
              'IdentityCard',
              'PassportNumber',
              'IP',
              'PostalCode',
              'ISBN',
              'MobilePhone',
              'PhoneNumber',
              'Hash',
            ].includes(answers.format)
          ) {
            return true;
          }
          return false;
        },
      },
      // --- Number Validator ---
      {
        type: 'number',
        name: 'minNumber',
        message: 'minimum number:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (
            ['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      {
        type: 'number',
        name: 'maxNumber',
        message: 'maximum number:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (
            ['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      // ---- Array Validator ----
      {
        type: 'number',
        name: 'minItems',
        message: 'minimum items:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (answers.array) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      {
        type: 'number',
        name: 'maxItems',
        message: 'maximum items:',
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (answers.array) {
            return true;
          }
          return false;
        },
        default: 0,
      },
      // ---- UUID Validators
      {
        type: 'list',
        name: 'uuidVersion',
        message: 'uuid version:',
        choices: ['any', '1', '3', '4', '5', '6', '7'],
        default: 3,
        when: (answers) => {
          if (!answers.addValidator) {
            return false;
          }
          if (['uuid'].includes(answers.type)) {
            return true;
          }
          return false;
        },
      },
      {
        type: 'confirm',
        name: 'hidden',
        message: 'should be hidden from response:',
        default: false,
        when: (answers) => {
          if (answers.skipDb) {
            return false;
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'lazy',
        message: 'should be lazy loading:',
        default: false,
        when: (answers) => {
          if (answers.skipDb) {
            return false;
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'unique',
        message: 'should be unique:',
        default: false,
        when: (answers) => {
          if (answers.skipDb) {
            return false;
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'default',
        message: 'default value:',
        when: (answers) => {
          if (answers.skipDb) {
            return false;
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'swagger',
        message: 'should be add to swagger:',
        default: true,
      },
      {
        type: 'input',
        name: 'swaggerExample',
        message: 'swagger example:',
        default: (answers: Record<string, any>) => {
          if (['string', 'text', 'character'].includes(answers.type)) {
            if (answers.format !== 'skip') {
              if (answers.format === 'Email') {
                return 'example@example.com';
              } else if (answers.format === 'StrongPassword') {
                return 'Example@1234';
              } else if (answers.format === 'IP') {
                if (answers.formatOption === '4') {
                  return '127.0.0.1';
                } else {
                  return '::1';
                }
              }
            }
            let mn: number = answers.minLength ? answers.minLength : 0;
            let mx: number = answers.maxLength ? answers.maxLength : 10;
            if (answers.type === 'character') {
              mn = answers.maxLength ? answers.maxLength : 10;
            }
            const chars = [];
            const CHARS =
              'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = mn; i <= mx; i++) {
              chars.push(CHARS[randomInt(0, CHARS.length)]);
            }
            return chars.join('');
          } else if (
            ['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            const mn = answers.minNumber ? answers.minNumber : 0;
            const mx = answers.maxNumber ? answers.maxNumber : 100;
            return randomInt(mn, mx + 1);
          } else if (answers.type === 'uuid') {
            const uv = answers.uuidVersion ? answers.uuidVersion : '4';
            if (uv === '1') {
              return v1();
            } else if (uv === '3') {
              return v3('example.com', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
            } else if (uv === '4') {
              return v4();
            } else if (uv === '5') {
              return v5('example.com', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
            } else if (uv === '6') {
              return v6();
            } else if (uv === '7') {
              return v7();
            } else {
              return v4();
            }
          } else if (answers.type === 'boolean') {
            return true;
          } else if (['datetime', 'date', 'time'].includes(answers.type)) {
            return new Date().toISOString();
          } else if (answers.type === 'json') {
            return {};
          } else if (answers.type === 'enum') {
            return 'generate auto';
          } else {
            return undefined;
          }
        },
      },
      {
        type: 'confirm',
        name: 'addCreate',
        message: 'should be add to create:',
        default: true,
      },
    ],
    actions: [
      // --- import from @mikro-orm/core ---
      {
        type: 'addImport',
        data: {
          path: entityPath,
          importName: 'p',
          from: '@mikro-orm/core',
        },
      },
      // --- import from @nestjs/swagger ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'ApiProperty',
          from: '@nestjs/swagger',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.swagger) {
            return 'ApiProperty - swagger is disabled';
          }
          if (answers.nullable) {
            return 'ApiProperty - property is optional';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'ApiPropertyOptional',
          from: '@nestjs/swagger',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.swagger) {
            return 'ApiPropertyOptional - swagger is disabled';
          }
          if (!answers.nullable) {
            return 'ApiPropertyOptional - property is not optional';
          }
        },
      },
      // --- import from class-transformer ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'Expose',
          from: 'class-transformer',
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsOptional',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsOptional - validator is disabled';
          }
          if (!answers.nullable) {
            return 'IsOptional - property is not optional';
          }
        },
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase moduleName}}/enums/{{kebabCase enumName}}.enum.ts',
        templateFile: `${templateDir}/enum.hbs`,
        skip: (answers: Record<string, any>) => {
          if (answers.type !== 'enum') {
            return 'new enum - property is not enum';
          }
          if (answers.enumPath !== 'new enum') {
            return 'enum class exists';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: '{{pascalCase enumName}}',
          from: (answers: Record<string, any>) => {
            return answers.enumPath === 'new enum'
              ? 'src/modules/{{kebabCase moduleName}}/enums/{{kebabCase enumName}}.enum.ts'
              : answers.enumPath;
          },
        },
        skip: (answers: Record<string, any>) => {
          if (answers.type !== 'enum') {
            return 'import enum - property is not enum';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsEnum',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsEnum - validator is disabled';
          }
          if (answers.type !== 'enum') {
            return 'IsEnum - property is not enum';
          }
        },
      },
      // --- String Validators ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsString',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsString - validator is disabled';
          }
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return 'IsString - property is not string';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'MaxLength',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'MaxLength - validator is disabled';
          }
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return 'MaxLength - property is not string';
          } else if (answers.maxLength < 0) {
            return 'MaxLength - value is less than zero';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'MinLength',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'MinLength - validator is disabled';
          }
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return 'MinLength - property is not string';
          } else if (answers.minLength < 0) {
            return 'MinLength - value is less than zero';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'Is{{format}}',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return `${answers.format} - validator is disabled`;
          }
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return `${answers.format} - property is not string`;
          } else if (answers.format === 'skip') {
            return `${answers.format} - value is less than zero`;
          }
        },
      },
      // --- Number Validator ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'Max',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'Max - validator is disabled';
          }
          if (
            !['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return 'Max - property is not number';
          } else if (answers.maxNumber < 0) {
            return 'Max - value is less than zero';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'Min',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'Min - validator is disabled';
          }

          if (
            !['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return 'Min - property is not number';
          } else if (answers.minNumber < 0) {
            return 'Min - value is less than zero';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsNumber',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsNumber - validator is disabled';
          }
          if (
            !['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return 'IsNumber - property is not number';
          }
        },
      },
      // --- Array Validator ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsArray',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsArray - validator is disabled';
          }
          if (!answers.array) {
            return 'IsArray - property is not array';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'ArrayMaxSize',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'ArrayMaxSize - validator is disabled';
          }
          if (!answers.array) {
            return 'ArrayMaxSize - property is not array';
          } else if (answers.maxItems < 0) {
            return 'ArrayMaxSize - value is less than zero';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'ArrayMinSize',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'ArrayMinSize - validator is disabled';
          }
          if (!answers.array) {
            return 'ArrayMinSize - property is not array';
          } else if (answers.minItems < 0) {
            return 'ArrayMinSize - value is less than zero';
          }
        },
      },
      // --- Boolean Validators ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsBoolean',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsBoolean - validator is disabled';
          }
          if (!['boolean'].includes(answers.type)) {
            return 'IsBoolean - property is not boolean';
          }
        },
      },
      // --- UUID Validators ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsUUID',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsUUID - validator is disabled';
          }
          if (!['uuid'].includes(answers.type)) {
            return 'IsUUID - property is not uuid';
          }
        },
      },
      // --- Date Validators ---
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsDate',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsDate - validator is disabled';
          }
          if (!['datetime', 'date', 'time'].includes(answers.type)) {
            return 'IsDate - property is not date';
          }
        },
      },
      {
        type: 'addImport',
        data: {
          path: domainPath,
          importName: 'IsNotEmpty',
          from: 'class-validator',
        },
        skip: (answers: Record<string, any>) => {
          if (!answers.addValidator) {
            return 'IsNotEmpty - validator is disabled';
          }
          if (answers.nullable) {
            return 'IsNotEmpty - property is optional';
          }
        },
      },
      {
        type: 'append',
        path: domainPath,
        pattern: /\<class-property \/\>/,
        unique: true,
        templateFile: `${templateDir}/class-property.hbs`,
      },
      {
        type: 'append',
        path: entityPath,
        pattern: /\<entity-property \/\>/,
        unique: true,
        templateFile: `${templateDir}/entity-property.hbs`,
      },
      {
        type: 'append',
        path: 'src/modules/{{kebabCase moduleName}}/dto/create-{{kebabCase entityName}}.dto.ts',
        pattern: /\<property \/\>/,
        unique: true,
        templateFile: `${templateDir}/create-dto-property.hbs`,
      },
    ],
  });
}

export default async function (plop: NodePlopAPI) {
  for (const helper of helpers) {
    helper(plop);
  }

  const actions: ((plop: NodePlopAPI) => void)[] = [addImportAction];

  for (const action of actions) {
    action(plop);
  }

  const generators: ((plop: NodePlopAPI) => void)[] = [
    resourceGenerator,
    propertyGenerator,
    moduleGenerator,
    serviceGenerator,
    providerGenerator,
    controllerGenerator,
  ];

  for (const generator of generators) {
    generator(plop);
  }
}
