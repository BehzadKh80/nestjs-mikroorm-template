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
      // ----
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
        skip: (answers: Record<string, any>): string | undefined => {
          if (answers.swagger && answers.nullable) {
            return 'ApiProperty - property is optional';
          }
          return undefined;
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
          if (answers.swagger && !answers.nullable) {
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
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return 'MaxLength - property is not string';
          } else if (!answers.addValidator) {
            return 'MaxLength - validator is disabled';
          } else if (answers.maxLength === 0) {
            return 'MaxLength - value is zero';
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
          if (!['string', 'text', 'character'].includes(answers.type)) {
            return 'MinLength - property is not string';
          } else if (!answers.addValidator) {
            return 'MinLength - validator is disabled';
          } else if (answers.minLength === 0) {
            return 'MinLength - value is zero';
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
          if (
            !['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return 'Max - property is not number';
          } else if (!answers.addValidator) {
            return 'Max - validator is disabled';
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
          if (
            !['integer', 'float', 'smallint', 'bigint'].includes(answers.type)
          ) {
            return 'Min - property is not number';
          } else if (!answers.addValidator) {
            return 'Min - validator is disabled';
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
          if (!answers.array) {
            return 'IsArray - property is not array';
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
