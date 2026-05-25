import { existsSync, readdirSync } from 'fs';
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
