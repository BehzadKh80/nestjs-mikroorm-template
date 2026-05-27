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
