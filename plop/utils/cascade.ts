import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import {
  fileImportsSymbol,
  removeTaggedBlocksMatching,
  removeTaggedBlockByName,
  removeUnusedImportFromFile,
  walkTs,
} from './file-edit';

export type CascadeReport = {
  file: string;
  removedBlocks: number;
  importResult: 'removed' | 'kept-still-used' | 'not-imported' | 'file-missing';
}[];

const SEARCH_ROOT = 'src';

function findInjectionSites(
  className: string,
  excludeFiles: string[] = [],
): string[] {
  const excluded = new Set(excludeFiles.map((f) => resolve(f)));
  return walkTs(SEARCH_ROOT).filter((f) => {
    if (excluded.has(resolve(f))) return false;
    return fileImportsSymbol(f, className);
  });
}

export function scanInjectionCascade(
  className: string,
  excludeFiles: string[] = [],
): string[] {
  return findInjectionSites(className, excludeFiles);
}

export function cascadeInjection(
  className: string,
  excludeFiles: string[] = [],
): CascadeReport {
  const sites = findInjectionSites(className, excludeFiles);
  const report: CascadeReport = [];
  for (const file of sites) {
    const removedBlocks = removeTaggedBlocksMatching(
      file,
      'property',
      className,
    );
    const importResult = removeUnusedImportFromFile(file, className);
    report.push({ file, removedBlocks, importResult });
  }
  return report;
}

export function scanConfigProviderReferences(
  providerSymbol: string,
  excludeFiles: string[] = [],
): string[] {
  const excluded = new Set(excludeFiles.map((f) => resolve(f)));
  return walkTs(SEARCH_ROOT).filter((f) => {
    if (excluded.has(resolve(f))) return false;
    return fileImportsSymbol(f, providerSymbol);
  });
}

function findModuleDependents(
  moduleClassName: string,
  excludeFiles: string[] = [],
): string[] {
  const excluded = new Set(excludeFiles.map((f) => resolve(f)));
  return walkTs(SEARCH_ROOT).filter((f) => {
    if (excluded.has(resolve(f))) return false;
    if (!f.endsWith('.module.ts')) return false;
    if (!existsSync(f)) return false;
    const content = readFileSync(f, 'utf8');
    return new RegExp(
      `\\/\\/ <(?:import|dependency) name="${moduleClassName.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      )}">`,
    ).test(content);
  });
}

export function scanModuleDepCascade(
  moduleClassName: string,
  excludeFiles: string[] = [],
): string[] {
  return findModuleDependents(moduleClassName, excludeFiles);
}

export function cascadeModuleDep(
  moduleClassName: string,
  excludeFiles: string[] = [],
): CascadeReport {
  const sites = findModuleDependents(moduleClassName, excludeFiles);
  const report: CascadeReport = [];
  for (const file of sites) {
    let removedBlocks = 0;
    if (removeTaggedBlockByName(file, 'import', moduleClassName)) {
      removedBlocks++;
    }
    if (removeTaggedBlockByName(file, 'dependency', moduleClassName)) {
      removedBlocks++;
    }
    const importResult = removeUnusedImportFromFile(file, moduleClassName);
    report.push({ file, removedBlocks, importResult });
  }
  return report;
}
