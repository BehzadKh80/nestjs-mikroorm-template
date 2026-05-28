import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { IGNORE_MODULES, MODULES_DIR } from './constants';
export function listModules(): string[] {
  if (!existsSync(MODULES_DIR)) return [];
  return readdirSync(MODULES_DIR, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && !IGNORE_MODULES.includes(entry.name),
    )
    .map((entry) => entry.name)
    .sort();
}

export function listControllers(module: string): string[] {
  const controllersPath = join(MODULES_DIR, module, 'controllers');
  if (!existsSync(controllersPath)) return [];
  return readdirSync(controllersPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.controller.ts'))
    .map((name) => name.replaceAll('.controller.ts', ''))
    .sort();
}

export function listServices(module: string): string[] {
  const controllersPath = join(MODULES_DIR, module, 'services');
  if (!existsSync(controllersPath)) return [];
  return readdirSync(controllersPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.service.ts'))
    .map((name) => name.replaceAll('.service.ts', ''))
    .sort();
}

export function listProviders(module: string): string[] {
  const controllersPath = join(MODULES_DIR, module, 'providers');
  if (!existsSync(controllersPath)) return [];
  return readdirSync(controllersPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => !name.endsWith('.spec.ts'))
    .map((name) => name.replaceAll('.ts', ''))
    .sort();
}

export function listGuards(module: string): string[] {
  const guardsPath = join(MODULES_DIR, module, 'guards');
  if (!existsSync(guardsPath)) return [];
  return readdirSync(guardsPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.guard.ts'))
    .map((name) => name.replaceAll('.guard.ts', ''))
    .sort();
}

export function listMiddlewares(module: string): string[] {
  const middlewaresPath = join(MODULES_DIR, module, 'middlewares');
  if (!existsSync(middlewaresPath)) return [];
  return readdirSync(middlewaresPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.middleware.ts'))
    .map((name) => name.replaceAll('.middleware.ts', ''))
    .sort();
}

export function listPipes(module: string): string[] {
  const pipesPath = join(MODULES_DIR, module, 'pipes');
  if (!existsSync(pipesPath)) return [];
  return readdirSync(pipesPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.pipe.ts'))
    .map((name) => name.replaceAll('.pipe.ts', ''))
    .sort();
}

export function listEntities(module: string): string[] {
  const entitiesPath = join(MODULES_DIR, module, 'entities');
  if (!existsSync(entitiesPath)) return [];
  return readdirSync(entitiesPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.entity.ts'))
    .map((name) => name.replaceAll('.entity.ts', ''))
    .sort();
}

export function listProperties(module: string, entity: string): string[] {
  const domainPath = join(MODULES_DIR, module, 'domains', `${entity}.ts`);
  if (!existsSync(domainPath)) return [];
  const content = readFileSync(domainPath, 'utf8');
  const names = new Set<string>();
  const pattern = /\/\/ <property name="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    names.add(match[1]);
  }
  return [...names].sort();
}

export function listDtos(module: string): string[] {
  const dtoPath = join(MODULES_DIR, module, 'dto');
  if (!existsSync(dtoPath)) return [];
  return readdirSync(dtoPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !IGNORE_MODULES.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.dto.ts'))
    .map((name) => name.replaceAll('.dto.ts', ''))
    .sort();
}

export function listRoutes(module: string, controller: string): string[] {
  const controllerFile = join(
    MODULES_DIR,
    module,
    'controllers',
    `${controller}.controller.ts`,
  );
  if (!existsSync(controllerFile)) return [];
  const content = readFileSync(controllerFile, 'utf8');
  const names = new Set<string>();
  const pattern = /\/\/ <route name="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    names.add(match[1]);
  }
  return [...names].sort();
}

export type FunctionTarget =
  | 'service'
  | 'provider'
  | 'guard'
  | 'middleware'
  | 'pipe';

export function targetFilePath(
  module: string,
  target: FunctionTarget,
  targetName: string,
): string {
  switch (target) {
    case 'service':
      return join(MODULES_DIR, module, 'services', `${targetName}.service.ts`);
    case 'provider':
      return join(MODULES_DIR, module, 'providers', `${targetName}.ts`);
    case 'guard':
      return join(MODULES_DIR, module, 'guards', `${targetName}.guard.ts`);
    case 'middleware':
      return join(
        MODULES_DIR,
        module,
        'middlewares',
        `${targetName}.middleware.ts`,
      );
    case 'pipe':
      return join(MODULES_DIR, module, 'pipes', `${targetName}.pipe.ts`);
  }
}

export function listFunctions(
  module: string,
  target: FunctionTarget,
  targetName: string,
): string[] {
  const filePath = targetFilePath(module, target, targetName);
  if (!existsSync(filePath)) return [];
  const content = readFileSync(filePath, 'utf8');
  const names = new Set<string>();
  const pattern = /\/\/ <function name="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    names.add(match[1]);
  }
  return [...names].sort();
}

const CONFIG_RESOURCES_DIR = 'src/modules/config/resources';

export function listConfigResources(): string[] {
  if (!existsSync(CONFIG_RESOURCES_DIR)) return [];
  return readdirSync(CONFIG_RESOURCES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('-resource.ts'))
    .map((name) => name.replace(/-resource\.ts$/, ''))
    .sort();
}

export function listConfigProperties(resource: string): string[] {
  const file = join(CONFIG_RESOURCES_DIR, `${resource}-resource.ts`);
  if (!existsSync(file)) return [];
  const content = readFileSync(file, 'utf8');
  const names = new Set<string>();
  const pattern = /\/\/ <property name="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    names.add(match[1]);
  }
  return [...names].sort();
}

export function listDtoProperties(module: string, dto: string): string[] {
  const dtoFile = join(MODULES_DIR, module, 'dto', `${dto}.dto.ts`);
  if (!existsSync(dtoFile)) return [];
  const content = readFileSync(dtoFile, 'utf8');
  const names = new Set<string>();
  const pattern = /\/\/ <property name="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    names.add(match[1]);
  }
  return [...names].sort();
}
